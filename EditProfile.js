import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class EditProfile extends React.Component{
    constructor (props) {
       super(props);
       this.state = {
           loginid: '',
           fname: '',
           lname: '',
           address: '',
           phone: '',
           email: '',
           age: '',
           id: ''
       }
    };
    _Fetchdata = (loginid) => {
        let auth = "key "+loginid;
        fetch('https://webbies.co/stage/suvridhi/api/profile-view/'+loginid, {
            method: 'GET',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": auth
            }
        }).then(response => response.json())
        .then(resdata => {
            if(resdata != undefined){
                this.setState({fname: resdata.fname});
                this.setState({lname: resdata.lname});
                this.setState({address: resdata.address});
                this.setState({phone: resdata.phone_number});
                this.setState({email: resdata.user_email});
                this.setState({age: resdata.age});
                this.setState({id: resdata.id}, () => {
                    console.log('done');
                });
            }
        }).catch(err => console.log(err));
    };
    componentDidMount () {
        AsyncStorage.getItem('login_id').then((value) => {
            this.setState({loginid: value}, () => {
                this._Fetchdata(this.state.loginid);
            });
        });
    };
    ChangeValue = (text, field) => {
        if(field == 'fname'){
            this.setState({fname: text});
        }else if(field == 'lname'){
            this.setState({lname: text});
        }else if(field == 'phone'){
            this.setState({phone: text});
        }else{
            this.setState({email: text});
        }
    };
    submit = () => {
        let submitObj = {};
        submitObj.email = this.state.email;
        submitObj.phno = this.state.phone;
        submitObj.fname = this.state.fname;
        submitObj.lname = this.state.lname;
        submitObj.address = this.state.address;
        submitObj.age = this.state.age;
        submitObj.id = this.state.id;
        this.updateme(submitObj);
    };
    updateme = (submitObj) => {
        let auth = "key "+this.state.loginid;
        fetch('https://webbies.co/stage/suvridhi/api/update-profile/'+this.state.loginid, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": auth
            },
            body: JSON.stringify(submitObj)
        }).then(response => response.json())
        .then(resdata => console.log(resdata))
        .catch(err => console.log(err));
    };
    render(){
        return(
            <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
              <View style={{flex: 30, flexDirection: 'column', height: 200}}>
                <ImageBackground 
                source={require('./images/back3.png')}
                style={scStyle.backgroundImage}
                >
                <Text onPress={()=> this.props.navigation.navigate('Settings')} style={{marginTop:15, marginLeft:10, color:'#fff', fontSize:16}}>
                    <Image source={require('./images/backbtn.png')} style={{height: 15, width: 15, marginHorizontal: 15}} />
                    Back To Settings
                </Text>
                  <Text style={scStyle.homeHeading}>My Profile</Text>
                  <Image source={require('./images/user.png')} style={scStyle.logo} />
                </ImageBackground>
              </View>
              <View style={{flex: 70, flexDirection: 'column', padding: 15, marginTop: 50}}>
                <Image source={require('./images/avatar4.png')} style={scStyle.avatar} />
                    <View style={{flex:100, flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                        <Text style={scStyle.label}>First Name:</Text>
                        <TextInput 
                            style={scStyle.txtInput}
                            placeholder="Ramesh"
                            value={this.state.fname}
                            onChangeText={(text) => this.ChangeValue(text, 'fname')}
                        />
                    </View> 
                    <View style={{flex:100, flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                        <Text style={scStyle.label}>Last Name:</Text>
                        <TextInput 
                            style={scStyle.txtInput}
                            placeholder="Aggarwal"
                            value={this.state.lname}
                            onChangeText={(text) => this.ChangeValue(text, 'lname')}
                        />
                    </View> 
                    <View style={{flex:100, flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                        <Text style={scStyle.label}>Phone NO:</Text>
                        <TextInput 
                            style={scStyle.txtInput}
                            placeholder="+91 9856321475"
                            value={this.state.phone}
                            onChangeText={(text) => this.ChangeValue(text, 'phone')}
                        />
                    </View>                                                     
                    <View style={{flex:100, flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                        <Text style={scStyle.label}>Email-ID:</Text>
                        <TextInput 
                            style={scStyle.txtInput}
                            placeholder="test@mail.com"
                            value={this.state.email}
                            onChangeText={(text) => this.ChangeValue(text, 'email')}
                        />
                    </View>
                    <TouchableOpacity style={scStyle.edit} onPress={this.submit}>
                        <Text style={scStyle.editTxt}>Edit</Text>
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
      width: 125,
      height: 125,
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
    },
    logo:{
        alignSelf: 'center',
        width: 150,
        height: 150,
        top: 30
      },
      homeHeading:{
        color: '#fff',
        alignSelf: 'center',
        fontSize: 28,
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    label:{
        color:'#354764',
        fontSize:18,
        fontWeight: 'bold',
        flex:50,
        textAlign:'center'
    },
    txtInput:{
        color:'#354764',
        fontSize:18,
        fontWeight: 'bold',
        flex:50,
    },
    edit:{
        alignSelf:"center",
        backgroundColor:'#5297F1',
        paddingHorizontal:50,
        paddingVertical:10,
        borderRadius:10,
        marginTop:15
    },
    editTxt:{
        fontSize:20,
        color: "#fff",
        fontWeight:'bold'
    }
});

export default EditProfile;