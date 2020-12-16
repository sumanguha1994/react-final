import React, {Component} from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, NativeModules, ScrollView } from 'react-native';
import {RtcEngine, AgoraView} from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNCallKeep from 'react-native-callkeep';
import {v4 as uuidv4} from 'uuid';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import db from './database';
import AsyncStorage from '@react-native-community/async-storage';

const {Agora} = NativeModules; 
const {FPS30, AudioProfileDefault, AudioScenarioDefault, Adaptative} = Agora; 

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerIds: [], 
      uid: Math.floor(Math.random() * 100), //this.props.route.params.uuid,
      appid: '7e58b7e0d0654e22a87a8451fe67872d', 
      channelName: this.props.route.params.roomid, //'testwebbies',  
      vidMute: false, 
      audMute: false, 
      joinSucceed: false, 
    };
    const config = {
      appid: this.state.appid, 
      channelProfile: 0, 
      videoEncoderConfig: {
        width: 720,
        height: 1080,
        bitrate: 1,
        frameRate: FPS30,
        orientationMode: Adaptative,
      },
      audioProfile: AudioProfileDefault,
      audioScenario: AudioScenarioDefault,
    };
    RtcEngine.init(config); 
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((res_uid) => {
      this.setState({uid: res_uid}, () => {
        console.log(this.state.uid);
      });
    });
    RtcEngine.on('userJoined', data => {
      console.log("hit 1");
      const {peerIds} = this.state; 
      if (peerIds.indexOf(data.uid) === -1) {
        this.setState({
          peerIds: [...peerIds, data.uid], 
        });
      }
    });
    RtcEngine.on('userOffline', data => {
      //If user leaves
      this.setState({
        peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
      });
    });
    RtcEngine.on('joinChannelSuccess', data => {
      console.log("hit 2");
      //If Local user joins RTC channel
      // RNCallKeep.answerIncomingCall(this.state.uid);
      // RNCallKeep.endCall(this.state.uid);
      RNCallKeep.backToForeground();
      RNCallKeep.rejectCall(this.state.uid);
      RtcEngine.startPreview(); //Start RTC preview
      this.setState({
        joinSucceed: true, //Set state variable to true
      });
    });
    RtcEngine.joinChannel(this.state.channelName, this.state.uid); //Join Channel
    RtcEngine.enableAudio(); //Enable the audio
  }

  toggleAudio() {
    let mute = this.state.audMute;
    console.log('Audio toggle', mute);
    RtcEngine.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  }
  
  toggleVideo() {
    let mute = this.state.vidMute;
    console.log('Video toggle', mute);
    this.setState({
      vidMute: !mute,
    });
    RtcEngine.muteLocalVideoStream(!this.state.vidMute);
  }
  
  endCall() {
    RtcEngine.destroy();
    //Actions.home();
    this.props.navigation.navigate('Feedback');
  }
  
  peerClick(data) {
    let peerIdToSwap = this.state.peerIds.indexOf(data);
    this.setState(prevState => {
      let currentPeers = [...prevState.peerIds];
      let temp = currentPeers[peerIdToSwap];
      currentPeers[peerIdToSwap] = currentPeers[0];
      currentPeers[0] = temp;
      return {peerIds: currentPeers};
    });
  }

  videoView() {
    return (
      <View style={styles.full}>
        {this.state.peerIds.length > 1 ? (
          <View style={styles.full}>
            <View style={{height: (dimensions.height * 3) / 4 - 50}}>
              <AgoraView
                style={styles.full}
                remoteUid={this.state.peerIds[0]}
                mode={1}
                key={this.state.peerIds[0]}
              />
            </View>
            <View style={{height: dimensions.height / 4}}>
              <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={dimensions.width / 2}
                snapToAlignment={'center'}
                style={{
                  width: dimensions.width,
                  height: dimensions.height / 4,
                }}>
                {this.state.peerIds.slice(1).map(data => (
                  <TouchableOpacity
                    style={{
                      width: dimensions.width / 2,
                      height: dimensions.height / 4,
                    }}
                    onPress={() => this.peerClick(data)}
                    key={data}>
                    <AgoraView
                      style={{
                        width: dimensions.width / 2,
                        height: dimensions.height / 4,
                      }}
                      remoteUid={data}
                      mode={1}
                      key={data}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : this.state.peerIds.length > 0 ? (
          <View style={{height: dimensions.height - 50}}>
            <AgoraView
              style={styles.full}
              remoteUid={this.state.peerIds[0]}
              mode={1}
            />
          </View>
        ) : (
          <Text>No users connected</Text>
        )}
        {!this.state.vidMute ? ( //view for local video
          <AgoraView
            style={styles.localVideoStyle}
            zOrderMediaOverlay={true}
            showLocalVideo={true}
            mode={1}
          />
        ) : (
          <View />
        )}
        <View style={styles.buttonBar}>
          <Icon.Button
            style={styles.iconStyleOne}
            backgroundColor="#5297F1"
            name={this.state.audMute ? 'mic-off' : 'mic'}
            size={30}
            onPress={() => this.toggleAudio()}
          />
          <View style={styles.gap}></View>
          <Icon.Button
            style={styles.iconStyleTwo}
            backgroundColor="#5297F1"
            name={this.state.vidMute ? 'videocam-off' : 'videocam'}
            size={30}
            onPress={() => this.toggleVideo()}
          />
        </View>
        <View style={styles.buttonBarTwo}>
          <Icon.Button
              style={styles.iconStyle}
              backgroundColor="#FF3030"
              name="call-end"
              size={30}
              onPress={() => this.endCall()}
            />
        </View>
      </View>
    );
  }
  render() {
    return this.videoView();
  }
}

let dimensions = {
  //get dimensions of the device to use in view styles
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  buttonBar: {
    height: 60,
    backgroundColor: 'transparent',
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 10,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonBarTwo: {
    height: 60,
    backgroundColor: 'transparent',
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 80,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  localVideoStyle: {
    width: 140,
    height: 160,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  iconStyle: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 30,
    borderRadius: 0,
  },
  iconStyleOne: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 30,
    borderRadius: 0
  },
  iconStyleTwo: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 30,
    borderRadius: 0
  },
  gap:{
    width:10,
  },
  full: {
    flex: 1,
  },
});

export default Video;
