import React, {Component} from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet,TouchableOpacity, FlatList, Image, PermissionsAndroid, Platform } from 'react-native';
import Detail from './buttomnav/home/Detail';
import Toast from 'react-native-simple-toast';
import PTRView from 'react-native-pull-to-refresh';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
//callkeep
import RNCallKeep from 'react-native-callkeep';
import {v4 as uuidv4} from 'uuid';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import db from './database';
import BackgroundTask from 'react-native-background-task';

BackgroundTask.define( () => {
  console.log('background');
  _firebase();
  // Remember to call finish()
  BackgroundTask.finish();
});

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        spinner: false,
        services: [],
        loginid: '',
        adv_name: '',
        room_id: '',
      }
    };
    //callkeep method 
    _firebase = () => {
      const options = {
        ios: {
          appName: 'My app name',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription: 'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'ok',
          imageName: 'phone_account_icon',
          // additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
          // Required to get audio in background when using Android 11
          foregroundService: {
            channelId: 'com.subridhhiapp',
            channelName: 'Foreground service for my app',
            notificationTitle: 'My app is running on background',
            notificationIcon: 'Path to the resource icon of the notification',
          },
        },
      };
      db.ref('/vdoroom').on('value', snapshot => {
        var data = snapshot.val();
        var rooms = Object.values(data);
        console.log(rooms.length);
        for (var i = 0; i < rooms.length; i++) {
          if (rooms[i].userid == this.state.loginid) {
            console.log(rooms);
            this.setState({adv_name: rooms[i].advisor_name});
            this.setState({room_id: rooms[i].roomid});
            RNCallKeep.setup(options).then(async (accepted) => {
              const hasPhoneAccount = await RNCallKeep.hasPhoneAccount();
              console.log('hasPhoneAccount', hasPhoneAccount);
              this._call();
            });
          }
        }
      });
    }
    _call = () => {
      // this._firebase();
      const id = uuidv4();
      //storage set value
      AsyncStorage.setItem('user_id', id);
      //get microphone access on background
      RNCallKeep.setForegroundServiceSettings({
        channelId: 'com.subridhhiappp',
        channelName: 'Foreground service for my app',
        notificationTitle: 'My app is running on background',
        notificationIcon: 'Path to the resource icon of the notification',
      });
      //Display system UI for incoming calls
      RNCallKeep.displayIncomingCall(id, this.state.adv_name, this.state.adv_name);
      console.log('Display: '+id);
      //Use this to tell the sdk a user answered a call from the app UI.
      //RNCallKeep.answerIncomingCall(id);
      RNCallKeep.addEventListener('answerCall', ({callUUID, ...o}) => {
        console.log("ok connecting..");
        // RNCallKeep.answerIncomingCall(callUUID);
        // RNCallKeep.endCall(id);
        console.log('Answer: '+callUUID);
        RNCallKeep.rejectCall(callUUID);
        RNCallKeep.backToForeground();
        this.props.navigation.navigate('Video', {uuid: id, roomid: this.state.room_id});
      });
      RNCallKeep.addEventListener('endCall', ({ callUUID }) => {
        console.log("ok end call");
        console.log('Reject: '+callUUID);
        RNCallKeep.rejectCall(callUUID);
      });
      setTimeout(() => {
        RNCallKeep.rejectCall(id);
      }, 15000);
    }
    //callkeep method
    _hideLoader = () => {
      this.setState({spinner: false});
    }
    _showLoader = () => {
      this.setState({spinner: true});
    }
    fetch_data = (loginid) => {
      let auth = "key "+loginid;
      this._showLoader();
      fetch("https://webbies.co/stage/suvridhi/api/services-all", {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "Authorization": auth
        }
      }).then(response => response.json())
      .then(res => {
        if(res != undefined){
          this._hideLoader();
          this.setState({services: res}, () => {
            console.log('done');
          });
        }
      });
    };
    async checkStatus() {
      const status = await BackgroundTask.statusAsync()
      
      if (status.available) {
        // Everything's fine
        return true;
      }
      
      const reason = status.unavailableReason;
      if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
        Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app');
      } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
        Alert.alert('Restricted', 'Background tasks are restricted on your device');
      }else{
        console.log('Something');
      }
    };
    componentDidMount() {
      BackgroundTask.schedule({
        period: 180, // Aim to run every 30 mins - more conservative on battery
      });
      // Optional: Check if the device is blocking background tasks or not
      this.checkStatus();

      AsyncStorage.getItem('login_id').then((value) => {
        if(value != null || value != undefined){
          this.setState({loginid: value}, () => {
            console.log(this.state.loginid);
            this.fetch_data(this.state.loginid);
            this._firebase();
          });
        }else{
          console.log("com from home");
          this.props.navigation.navigate('Onboard');
        }
      });
    }
    // componentDidUpdate () {
    //   this.componentDidMount();
    // }
    ChildView = ({dId, dtitle, dDes}) => {
      return (
        <View style={scStyle.container}>
          <View style={scStyle.vew1}>
          <ImageBackground 
            source={require('./images/opt1.png')}
            style={scStyle.backgroundImage}
          >
          </ImageBackground>
          </View>
          <View style={scStyle.vew2}>
            <Text style={scStyle.txt1}>{dtitle}</Text>
            <Text style={scStyle.txt2}>{dDes}</Text>
            <TouchableOpacity 
                style={scStyle.CardBtn}
                onPress={() => this.props.navigation.navigate('Detail', {servid: dId, serv_title: dtitle, serv_des: dDes})}
            >
                <Text style={scStyle.btntxt}>View Details</Text>
            </TouchableOpacity> 
          </View>
        </View>
      )
    };
    _choose_a_plan = () => {
      Toast.show('OPPS !! You have to select a plan first.');
    };
    _refresh = () => {
      return new Promise((resolve) => {
        setTimeout(() => {resolve()}, 2000)
      });
    };
    render() {
        const {dbservices} = this.state.services;
        return (
          <PTRView onRefresh={this._refresh}>
            <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
                <Spinner
                  visible={this.state.spinner}
                  textContent={'Loading...'}
                  textStyle={scStyle.spinnerTextStyle}
                />
                <View style={{flex: 30, flexDirection: 'column', height: 290}}>
                    <ImageBackground 
                      source={require('./images/home.png')}
                      style={scStyle.backgroundImage}
                    >
                    </ImageBackground >
                </View>
                <View style={{flex: 70, flexDirection: 'column', paddingHorizontal: 20}}>
                    <Text style={scStyle.homeHeading}>Topics for Discussion</Text>
                    <Text style={scStyle.homeP}>To make our call more productive select topics you want to discuss</Text>
                    <View style={{flex:100, flexDirection: "row", marginVertical: 10}}>
                        <View style={{flex:60, flexDirection: "column"}}>
                            <Text style={scStyle.recoTopic}>Full Financial review</Text>
                            <Text style={scStyle.reco}>Recommended</Text>
                        </View>
                        <View style={{flex:40, flexDirection: "column"}}>
                            <TouchableOpacity 
                                style={scStyle.button}
                                onPress={() => this._choose_a_plan()} 
                            >
                                <Text style={scStyle.btntxt}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={scStyle.choose}> Or Choose Something Specific</Text>
                </View>
                <FlatList
                    horizontal={true}
                    data={this.state.services}
                    keyExtractor={ item => item.id.toString() }
                    renderItem={({item}) => <this.ChildView dId={item.id} dtitle={item.service} dDes={item.description}/>}
                    style={{marginBottom:50}}
                />
            </ScrollView>
          </PTRView>
        )
    }
}
const scStyle = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    backgroundImage: {
        resizeMode: 'contain',
        justifyContent: 'center',
        height: '100%'
    },
    homeHeading:{
        color: '#354764',
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: -15
    },
    homeP:{
      color: '#A1A5AB',
      fontSize: 18  
    },
    button:{
        backgroundColor: '#5297F1',
        alignSelf: "center",
        padding: 10,
        width: '95%',
        margin: 10,
        borderRadius: 12,
        shadowColor: '#2C98F0',
        elevation: 10,
        shadowRadius: 30 ,
        shadowOffset : { width: 56, height: 13}
      },
      btntxt:{
          textAlign: 'center',
          color: '#fff',
          fontSize: 20,  
      },
      recoTopic:{
          fontSize: 20,
          color:'#354764',
          fontWeight: 'bold',
          marginTop: 7
      },
      reco:{
          color:'#A1A5AB',
          fontSize:18
      },
      choose:{
          textTransform:'uppercase',
          fontSize: 20,
          color: '#354764',
          fontWeight: 'bold',
          marginVertical: 8
      },
      container: {
        flex: 100,
        flexDirection: "column",
        backgroundColor: "white",
        margin: 15,
        borderRadius: 20,
        shadowColor: '#000',
        elevation: 10,
        shadowRadius: 500 ,
        shadowOffset : { width: 100, height: 50},
        shadowOpacity: 0.5,
        paddingBottom: 1,
        
      },
      vew1: {
        flex: 50,
        backgroundColor: 'white',
        height: 145,
        width: '100%',
        borderRadius: 16,
      },
      vew2: {
        flex: 70,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 16,
      },
      txt1: {
        color: '#79A1F2',
        fontSize: 24,
        fontWeight:'bold',
        textAlign: 'center',
        textTransform:'capitalize',
        marginTop: -5
      },
      txt2: {
        color: 'black',
        padding: 10,
        fontSize: 18,
        width:195,
        textAlign:'center'
      },
      img: {
        height: 100,
        width: '100%',
        padding: 10
      },
      CardBtn:{
        backgroundColor: '#5297F1',
        alignSelf: "center",
        padding: 10,
        width: '90%',
        margin: 10,
        borderRadius: 12,
        shadowColor: '#2C98F0',
        elevation: 10,
        shadowRadius: 30 ,
        shadowOffset : { width: 56, height: 13}
      },
});
export default Home;
{/*this._choose_a_plan()*/}