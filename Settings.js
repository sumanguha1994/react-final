import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

class Settings extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      servid: '',
    }
  }
  componentDidMount () {
    AsyncStorage.getItem('serv_id').then((value) => {
      if(value != undefined){
        this.setState({servid: value}, () => {
          console.log(this.state.servid);
        });
      }else{
        this.props.navigation.navigate('Home');
      }
    });
  }
  render(){
    return(
        <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
          <View style={{flex: 30, flexDirection: 'column', height: 200}}>
            <ImageBackground 
            source={require('./images/back3.png')}
            style={scStyle.backgroundImage}
            > 
              <Text style={scStyle.homeHeading}>Settings</Text>
              <Image source={require('./images/gear.png')} style={scStyle.logo} />
            </ImageBackground>
          </View>
          <View style={{flex: 70, flexDirection: 'column', padding: 15, marginTop: 50}}>
            <TouchableOpacity style={scStyle.card} onPress={()=> this.props.navigation.navigate('EditProfile')}>
                <View style={{flex:100, flexDirection:'row'}}>
                    <Image source={require('./images/sprofile.png')} style={scStyle.time} />
                    <Text style={scStyle.cardHeading}>My Profile</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={scStyle.card} onPress={()=> this.props.navigation.navigate('BookingHistory', {service_id: this.state.servid})}>
                <View style={{flex:100, flexDirection:'row'}}>
                    <Image source={require('./images/sbook.png')} style={scStyle.time} />
                    <Text style={scStyle.cardHeading}>My Bookings</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={scStyle.card} onPress={()=> this.props.navigation.navigate('TermsAndConditions')}>
                <View style={{flex:100, flexDirection:'row'}}>
                    <Image source={require('./images/stnc.png')} style={scStyle.time} />
                    <Text style={scStyle.cardHeading}>Terms and Condition</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={scStyle.card} onPress={()=> this.props.navigation.navigate('PrivacyPolicy')}>
                <View style={{flex:100, flexDirection:'row'}}>
                    <Image source={require('./images/spp.png')} style={scStyle.time} />
                    <Text style={scStyle.cardHeading}>Privacy Policy</Text>
                </View>
            </TouchableOpacity>
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
      top: 30
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
        marginTop: -10,
        color: '#5297F1',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10  
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
    card:{
      height: 'auto',
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 15,
      marginHorizontal:10,
      borderColor:'#354764',
      borderBottomWidth:1
    },
    homeHeading:{
      color: '#fff',
      alignSelf: 'center',
      fontSize: 28,
      fontWeight: "bold",
      marginTop: 20,
      paddingTop: 15,
      textTransform: 'uppercase'
  },
  cardHeading:{
      fontSize: 30,
      color:'#354764',
      marginLeft:10
  },
  time:{
      marginTop: 5
  },
  topic:{
      fontSize: 18,
      color:'#A1A5AB',
      marginHorizontal: 5,
      paddingBottom: 15
  }
});

export default Settings;