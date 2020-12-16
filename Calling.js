import React, {Component} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import requestCameraAndAudioPermission from './permission';

class Calling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AppID: '7e58b7e0d0654e22a87a8451fe67872d',  
      AppIDView: '7e58b7e0d0654e22a87a845*******',
      ChannelName: 'testwebbies',
    };
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(_ => {
        console.log('requested!');
      });
    }
  }
  handleSubmit = () => {
    let AppID = this.state.AppID;
    let ChannelName = this.state.ChannelName;
    let obj = {AppID: AppID, ChannelName: ChannelName};
    if (AppID !== '' && ChannelName !== '') {
      this.props.navigation.navigate('Video', {videoObj: obj});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.formLabel}>App ID</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={AppID => this.setState({AppID})}
          value={this.state.AppIDView}
        />
        <Text style={styles.formLabel}>Channel Name</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={ChannelName => this.setState({ChannelName})}
          value={this.state.ChannelName}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Start Call!"
            onPress={this.handleSubmit()}
            style={styles.submitButton}>
            <Text style={styles.white}> Start Call </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formLabel: {
    paddingBottom: 10,
    paddingTop: 10,
    color: '#0093E9',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  submitButton: {
    paddingHorizontal: 60,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  formInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    color: '#0093E9',
    borderRadius: 4,
    paddingLeft: 20,
  },
  white: {
    color: '#fff',
  },
});

export default Calling;