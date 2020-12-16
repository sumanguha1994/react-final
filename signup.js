import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

class Signup extends React.Component{
  constructor() {
      super();
      this.state = {
        date: new Date(),
        spinner: false,
        fname: '',
        lname: '',
        emailid: '',
        phno: '',
        age: '',
        password: '',
        address: ''
      }
  };
  _hideLoader = () => {
    this.setState({spinner: false});
  }
  _showLoader = () => {
    this.setState({spinner: true});
  }
  ChangeValue = (text, field) => {
    if(field == 'fname'){
      this.setState({fname: text});
    }else if(field == 'lname'){
      this.setState({lname: text});
    }else if(field == 'emailid'){
      this.setState({emailid: text});
    }else if(field == 'phno'){
      this.setState({phno: text});
    }else if(field == 'age'){
      this.setState({age: text});
    }else if(field == 'password'){
      this.setState({password: text});
    }else{
      this.setState({address: text});
    }
  };
  submit = () => {
    let signoutObj = {};
    signoutObj.mail = this.state.emailid;
    signoutObj.phno = this.state.phno;
    signoutObj.password = this.state.password;
    signoutObj.role = 'user';
    signoutObj.fname = this.state.fname;
    signoutObj.lname = this.state.lname;
    signoutObj.location = this.state.address;
    signoutObj.age = this.state.age;
    this._showLoader();
    fetch('https://webbies.co/stage/suvridhi/api/user-create/', {
      method: 'POST',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(signoutObj)
    }).then(response => response.json())
    .then(resobj => {
      this._hideLoader();
      if(resobj != undefined || resobj != 'notcreated'){
        AsyncStorage.setItem('login_id', resobj.id);
        this.props.navigation.navigate('Home');
      }else{
        Toast.show("User Not Created. Something Went Wrong !!");
      }
    }).catch(err => Toast.show("User Not Created. Something Went Wrong !!"));
  }
  render(){
    return(
        <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
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
                <Text style={scStyle.heading}>CREATE AN ACCOUNT</Text>
                <Text style={scStyle.label}>Full Name</Text>
                <View style={{flex: 100, flexDirection:'row'}}>
                  <TextInput 
                      style={[scStyle.txtInput, scStyle.fname]}
                      placeholder="First Name"
                      onChangeText={(text) => this.ChangeValue(text, 'fname')}
                  />
                  <TextInput 
                      style={[scStyle.txtInput, scStyle.lname]}
                      placeholder="Last Name"
                      onChangeText={(text) => this.ChangeValue(text, 'lname')}
                  />
                </View>
                <Text style={scStyle.label}>Email ID</Text>
                <TextInput 
                    style={scStyle.txtInput}
                    placeholder="loream@gmail.com"
                    onChangeText={(text) => this.ChangeValue(text, 'emailid')}
                />
                <Text style={scStyle.label}>Phone Number</Text>
                <TextInput 
                    style={scStyle.txtInput}
                    placeholder="9876543210"
                    onChangeText={(text) => this.ChangeValue(text, 'phno')}
                />
                <Text style={scStyle.label}>Age</Text>
                <TextInput 
                    style={scStyle.txtInput}
                    placeholder="Enter Age"
                    keyboardType="numeric"
                    onChangeText={(text) => this.ChangeValue(text, 'age')}
                />
                <Text style={scStyle.label}>Password</Text>
                <TextInput 
                    style={scStyle.txtInput}
                    placeholder="Enter password"
                    onChangeText={(text) => this.ChangeValue(text, 'password')}
                />
                <Text style={scStyle.label}>Address</Text>
                <TextInput 
                    style={scStyle.txtInput}
                    placeholder="House NO, Road, Area"
                    onChangeText={(text) => this.ChangeValue(text, 'address')}
                />
                <TouchableOpacity 
                    style={scStyle.button}
                    onPress={() => this.submit()}
                >
                    <Text style={scStyle.btntxt}>Signup</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 20}}>
                <Text style={{alignSelf: 'center', fontSize: 18}}>Already have an account</Text>
              <Text onPress={() => this.props.navigation.navigate('Login')} style={scStyle.signup}>Sign In</Text>
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
      },
      signup:{
        alignSelf: 'center', 
        fontSize: 32,
        fontWeight: "600", 
        marginVertical: 10, 
        borderBottomColor:'#5297F1', 
        borderStyle: 'solid', 
        borderBottomWidth: 2, 
        paddingBottom: 5
      },
      fname:{
        flex: 50,
        flexDirection:'column'
      },
      lname:{
        flex: 50,
        flexDirection:'column'
      }
});


export default Signup;