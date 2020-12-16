import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

class Cancel extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      bookingid: this.props.route.params.bookingid,
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
        Toast.show("Please Select A Service First !!");
        this.props.navigation.navigate('Home');
      }
    });
  };
  _goBack = () => {
    this.props.navigation.navigate('BookingDetails', {servid: this.state.servid, bookid: this.state.bookingid});
  };
  _goReason = () => {
    this.props.navigation.navigate('Reasons', {bookingid: this.state.bookingid});
  };
  render(){
    return(
        <ScrollView style={{flex: 100, backgroundColor: '#fff', padding:10}}>
          <View style={scStyle.card}>
            <Text style={scStyle.mtxt}>Are You Sure To Cancel This Meeting?</Text>
            <View style={{flex: 100, flexDirection:'row', marginTop: 80, alignItems: 'center'}}>
                <TouchableOpacity style={scStyle.no} onPress={()=> this._goBack()}>
                    <Text style={scStyle.notxt}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={scStyle.yes} onPress={()=> this._goReason()}>
                    <Text style={scStyle.ytxt}>Yes</Text>
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
    );
  }
} 

const scStyle = StyleSheet.create({
   card:{
       width: 380,
       backgroundColor:'#fff',
       height: 250,
       borderRadius:26,
       shadowColor: '#f3f3f3',
       elevation: 10,
       shadowRadius: 100 ,
       shadowOffset : { width: 53, height: 300},
       marginVertical: 150,
       marginHorizontal: 8,
       shadowOpacity: 0.1,
       alignSelf: 'center',
       padding: 15
   },
    mtxt:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#354764'
    },
    no:{
        backgroundColor: '#fff',
        borderColor: '#5297F1',
        borderWidth: 2,
        flex: 50,
        borderRadius: 10,
        padding: 8,
        alignItems:'center',
        marginHorizontal:5
    },
    notxt:{
        fontSize: 20,
        color: '#5297F1',
        fontWeight: 'bold'
    },
    yes:{
        backgroundColor: '#5297F1',
        borderColor: '#5297F1',
        borderWidth: 2,
        flex: 50,
        borderRadius: 10,
        padding: 8,
        alignItems:'center',
        marginHorizontal:5
    },
    ytxt:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
});

export default Cancel;