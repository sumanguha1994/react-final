import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Spinner from 'react-native-loading-spinner-overlay';

class Login extends React.Component{
  constructor () {
    super();
    this.state = {
      spinner: false,
      username: 'app@mail.com',
      password: 'app'
    };
  }
  componentDidMount () {
    AsyncStorage.getItem('login_id').then((value) => {
      if(value != null || value != undefined){
        this.props.navigation.navigate('Buttomnav');
      }else{
        console.log("loged in");
      }
    });
  }
  _hideLoader = () => {
    this.setState({spinner: false});
  }
  _showLoader = () => {
    this.setState({spinner: true});
  }
  ChangeValue = (text, field) => {
    if(field == 'username'){
      this.setState({username: text});
    }else{
      this.setState({password: text});
    }
  };
  submit = () => {
    let submitObj = {};
    submitObj.email = this.state.username;
    submitObj.password = this.state.password;
    this._showLoader();
    fetch('https://webbies.co/stage/suvridhi/api/user-login', {
      method: 'POST',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(submitObj)
    }).then(response => response.json())
    .then(resobj => {
      this._hideLoader();
      if(resobj.error != 'notfound'){
        AsyncStorage.setItem('login_id', resobj.id.toString());
        this.props.navigation.navigate('Buttomnav');
      }else{
        Toast.show('OPPS!! User Not Found !!');
      }
    }).catch((err) => {console.log(err)});
  }
  render(){
    return(
        <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
          <StatusBar backgroundColor='#5297F1' barStyle='light-content' />
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={scStyle.spinnerTextStyle}
          />
          <View style={{flex: 30, flexDirection: 'column', height: 200}}>
            <ImageBackground 
            source={require('./images/back3.png')}
            style={scStyle.backgroundImage}
          >
             <Image source={require('./images/logo.png')} style={scStyle.logo} />
          </ImageBackground >
          </View>
          <View style={{flex: 70, flexDirection: 'column', padding: 10, marginTop: 50}}>
            <View style={{flex: 10}}></View>
            <View style={{flex: 30}}>
            <Text style={scStyle.heading}>Login</Text>
            <Text style={scStyle.label}>User name</Text>
            <TextInput 
              style={scStyle.txtInput}
              placeholder="Enter Username"
              value={this.state.username}
              onChangeText={(text) => this.ChangeValue(text, 'username')}
            />
            <Text style={scStyle.label}>Password</Text>
            <TextInput 
              style={scStyle.txtInput}
              placeholder="Enter password"
              value={this.state.password}
              onChangeText={(text) => this.ChangeValue(text, 'password')}
            />
            <TouchableOpacity 
              style={scStyle.button}
              onPress={() => this.submit()}
            >
              <Text style={scStyle.btntxt}>Login</Text>
            </TouchableOpacity>
            </View>
            <View style={{flex: 10, flexDirection: "row"}}>
              <View style={{flex: 5}}>
                <Text onPress={() => this.props.navigation.navigate('Forgotpass')} style={scStyle.label}>Forgot password</Text>
              </View>
              <View style={{flex: 5, flexDirection: "row"}}>
                <View style={{flex: 1}}>
                <CheckBox
                    value={false} />
                </View>
                <View style={{flex: 4}}>
                <Text style={scStyle.label}>Remember me</Text>
                </View>
              </View>
            </View>
            <View style={{flex: 10}}>
              <Text style={{alignSelf: 'center', fontSize: 18}}>OR</Text>
              <Text onPress={() => this.props.navigation.navigate('Signup')} style={{alignSelf: 'center', fontSize: 17}}>Create Account</Text>
            </View>
          </View>
        </ScrollView>
    );
  }
}

const scStyle = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    backgroundImage: {
      resizeMode: 'cover',
      justifyContent: 'center',
      height: '100%'
    },
    logo:{
      alignSelf: 'center',
      width: 150,
      height: 150,
      top: 65
    },
    head:{
      flex: 1,
      height: 275,
      width: '100%',
      position: 'relative'
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
    heading:{
        margin: 10,
        color: '#5297F1',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: "uppercase"  
    },
    label:{
        fontSize: 16,
        margin: 10
    },
    txtInput:{
        margin: 10,
        backgroundColor:'#f1f1f1',
        borderRadius: 10,
        paddingLeft: 15
    }
});


export default Login;