import React, {Component} from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet,TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

class Detail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        spinner: false,
        id: '',
        plan_name: '',
        plan_description: '',
        loginid: ''
      }
    };
    _hideLoader = () => {
      this.setState({spinner: false});
    }
    _showLoader = () => {
      this.setState({spinner: true});
    }
    _fetch_api = (loginid, servid) => {
      let auth = "key "+loginid;
      this._showLoader();
      fetch('https://webbies.co/stage/suvridhi/api/single-service/'+servid, {
        method: 'GET',
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "Authorization": auth
        }
      }).then(response => response.json())
      .then(resdata => {
        this._hideLoader();
        if(resdata != 'notfound'){
          this.setState({id: resdata.id}, () => {
            AsyncStorage.removeItem('serv_id');
            AsyncStorage.setItem('serv_id', resdata.id.toString());
            console.log(this.state.id);
          });
          this.updateHeader(resdata);
        }else{
          Toast.show("OPPS!! No Result Found.");
        }
      }).catch(err => console.log(err));
    };
    componentDidMount () {
      AsyncStorage.getItem('login_id').then((value) => {
        this.setState({loginid: value}, () => {
          this._fetch_api(this.state.loginid, this.props.route.params.servid);
        }); 
      });
    };
    updateHeader = (resdata) => {
      this.setState({plan_name: resdata.service});
      this.setState({plan_description: resdata.description});
    }
    render() {
      return (
        <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={scStyle.spinnerTextStyle}
            />
            <View style={{flex: 30, flexDirection: 'column', height: 300, marginTop: -25}}>
                <ImageBackground 
                source={require('../../images/pension.png')}
                style={scStyle.backgroundImage}
                >
                </ImageBackground >
            </View>
            <View style={{flex: 70, flexDirection: 'column', paddingHorizontal: 20}}>
                <Text style={scStyle.homeHeading}>
                  {this.state.plan_name} Plan
                </Text>
                <Text style={scStyle.homeP}>
                  {this.state.plan_description}
                </Text>
                <View style={{flex:100, flexDirection: "column", marginVertical: 10}}>
                    <View style={{flex:100, flexDirection: "column", marginVertical: 8}}>
                        <Text style={scStyle.recoTopic}>Plan 01</Text>
                        <Text style={scStyle.reco}>To make our call more productive select topics you want to discuss</Text>
                    </View>
                    <View style={{flex:100, flexDirection: "column",marginVertical: 8}}>
                        <Text style={scStyle.recoTopic}>Plan 02</Text>
                        <Text style={scStyle.reco}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Text>
                    </View>
                </View>
                <View style={{flex:100, flexDirection: "row"}}>
                    <TouchableOpacity 
                        style={scStyle.button} 
                        onPress={() => this.props.navigation.navigate('Schedule', {service_id: this.state.id})}
                    >
                        <Text style={scStyle.btntxt}>Book Now</Text>
                    </TouchableOpacity>
                </View>                    
            </View>
        </ScrollView>
      );
    }
}
{/*this.props.navigation.navigate('BookingHistory', {service_id: this.state.id})*/}
{/*this.props.navigation.navigate('Schedule', {service_id: this.state.id})*/}
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
        width: '100%',
        borderRadius: 12,
        shadowColor: '#2C98F0',
        elevation: 10,
        shadowRadius: 30 ,
        shadowOffset : { width: 56, height: 13},
        marginVertical: 10
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
export default Detail;