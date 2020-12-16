import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

class Feedback extends React.Component{  
  constructor (props) {
    super(props);
    this.state = {
      esign: '',
      comment: '',
      userid: '',
    };
  };
  emojisign = (emojisign) => {
    this.setState({esign: emojisign});
  };
  changeValue = (text, field) => {
    if(field == 'comment'){
      this.setState({comment: text});
    }
  };
  componentDidMount = () => {
    AsyncStorage.getItem('login_id').then((value) => {
        this.setState({userid: value});
    });
  };
  submit = () => {
    let auth = "key "+this.state.userid;
    let submitObj = {};
    submitObj.esign = this.state.esign;
    submitObj.comment = this.state.comment;
    submitObj.userid = this.state.userid;
    submitObj.advisorid = 30,
    submitObj.bookingid = 12
    fetch('https://webbies.co/stage/suvridhi/api/store-feedback/', {
      method: 'POST',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": auth
      },
      body: JSON.stringify(submitObj)
    }).then(response => response.json())
    .then(resdata => {
      if(resdata != 'errorfound'){
        this.props.navigation.navigate('Home');
      }else{
        Toast.show("OPPS!! Review's Not Inserted.");
      }
    }).catch(err => console.log(err));
  };
  render(){
    return(
        <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
          <View style={{flex: 30, flexDirection: 'column', height: 200}}>
            <ImageBackground 
            source={require('./images/back3.png')}

            style={scStyle.backgroundImage}
            >
              <Image source={require('./images/avatar4.png')} style={scStyle.avatar} />
            </ImageBackground>
          </View>
          <View style={{flex: 70, flexDirection: 'column', padding: 15, marginTop: 50}}>
            <Text style={scStyle.name}>give us feedback</Text>
            <View style={scStyle.emoji}>
                <TouchableOpacity onPress={this.emojisign.bind(this, 'hpy')}>
                    <Image source={require('./images/hpy.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.emojisign.bind(this, 'ok')}>
                    <Image source={require('./images/ok.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.emojisign.bind(this, 'sad')}>
                    <Image source={require('./images/sad.png')}/>
                </TouchableOpacity>
            </View>
            <Text style={scStyle.comments}>Comments Here</Text>
            <TextInput 
              style={scStyle.txtInput}
              onChangeText={(text) => this.changeValue(text, 'comment')}
            />
            <View style={{width:'70%', height: 1, backgroundColor:'#707070', alignSelf:'center'}}></View>
            <TouchableOpacity 
                style={scStyle.button}
                onPress={() => this.submit()}
            >
                <Text style={scStyle.btntxt}>Submit</Text>
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
        fontSize: 30,
        color:'#5297F1',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign:'center',
        textTransform: 'uppercase'
    },
    emoji:{
        flex: 100,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    comments:{
        fontSize: 28,
        color: '#354764',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 50
    },
    txtInput:{
        alignSelf:'center',
        width: '70%',
        fontSize:24,
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
        textAlign:"center",
        fontSize:20,
        color: '#fff'
      }
});

export default Feedback;