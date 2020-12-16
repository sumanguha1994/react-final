import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Forgotpass extends React.Component{
  render(){
    return(
        <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
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
            <View style={{flex: 55}}>
            <Text style={scStyle.heading}>FORGET PASSWORD</Text>
            <Text style={scStyle.label}>EMail ID</Text>
            <TextInput 
              style={scStyle.txtInput}
              placeholder="loream@gmail.com"
              onChangeText={(text) => console.warn(text)}
            />
            <TouchableOpacity 
              style={scStyle.button}
              onPress={() => submit()}
            >
              <Text style={scStyle.btntxt}>Reset Password</Text>
            </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
    );
  }
}

const scStyle = StyleSheet.create({
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
        fontWeight: 'bold'  
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


export default Forgotpass;