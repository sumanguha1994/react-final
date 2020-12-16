import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      advisorid: this.props.route.params.advisor_id,
      loginid: '',
      detail: ''
    }
  }
  _fetchdata = (loginid) => {
    let auth = "key "+loginid;
    let id = this.state.advisorid;
    let detail = [ ...this.state.detail ];
    fetch('https://webbies.co/stage/suvridhi/api/profile-view/'+id, {
      method: 'GET',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": auth
      }
    }).then(response => response.json())
    .then(resdata => {
      if(resdata != undefined){
        detail = resdata;
        this.setState({detail}, () => {
          console.log("done");
        });
      }else{
        Toast.show("OPPS!! No Data Found !!");
      }
    }).catch(err => console.log(err));
  };
  componentDidMount () {
    AsyncStorage.getItem('login_id').then((value) => {
      this.setState({loginid: value}, () => {
        this._fetchdata(this.state.loginid);
      });
    });
  };
  render(){
    return(
        <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
          <View style={{flex: 30, flexDirection: 'column', height: 200}}>
            <ImageBackground 
            source={require('./images/back3.png')}
            style={scStyle.backgroundImage}
            >
              <Image source={{uri: 'https://webbies.co/stage/suvridhi/public'+'/'+this.state.detail.profilepic}} style={scStyle.avatar} />
            </ImageBackground>
          </View>
          <View style={{flex: 70, flexDirection: 'column', padding: 15, marginTop: 50}}>
            <Text style={scStyle.name}>{this.state.detail.fname} {this.state.detail.lname}</Text>
            <Text style={scStyle.serve}>{this.state.detail.role}</Text>
            <Text style={scStyle.rev}>Review</Text>
            <Text style={scStyle.desc}>{this.state.detail.description}</Text>
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
    avatar:{
      alignSelf: 'center',
      width: 150,
      height: 150,
      top: 65,
      borderRadius:100,
      borderColor: '#fff',
      borderWidth:10,
    },
    name:{
        fontSize: 26,
        color:'#405473',
        fontWeight: 'bold',
        marginBottom: 5
    },
    serve:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom: 10,
        color: '#636363',
    },
    rev:{
        fontSize:18,
        fontWeight:'bold',
        color:'#405473',
        borderBottomColor:'#707070',
        borderBottomWidth: 1,
        paddingBottom:5,
        marginBottom: 10
    },
    desc:{
        fontSize:16,
        color: '#636363',
        lineHeight:22
    }
    
});

export default Profile;