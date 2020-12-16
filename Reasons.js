import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, 
          TextInput, TouchableOpacity, CheckBox, Alert,FlatList, useState, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

class Reasons extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      spinner: false,
      checked: 1,
      cause: '',
      booking_id: this.props.route.params.bookingid,
      loginid: '',
      cozdata: []
    }
  }
  _hideLoader = () => {
    this.setState({spinner: false});
  }
  _showLoader = () => {
    this.setState({spinner: true});
  }
  _FetchData = (loginid) => {
    let auth = "key "+loginid;
    let cozdata = [ ...this.state.cozdata ];
    this._showLoader();
    fetch('https://webbies.co/stage/suvridhi/api/cancel-reason/', {
      method: 'GET',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": auth
      }
    }).then(response => response.json())
    .then(resdata => {
      this._hideLoader();
      if(resdata != undefined){
        cozdata = resdata;
        this.setState({cozdata}, () => {
          console.log('done');
        });
      }else{
        Toast.show("OPPS!! NO Result Found !!");
      }
    }).catch(err => console.log(err));
  };
  componentDidMount () {
    AsyncStorage.getItem('login_id').then((value) => {
      this.setState({loginid: value}, () => {
        this._FetchData(this.state.loginid);
      }); 
    });
  };
  changeStatus = (id, cause) => {
    this.setState({checked: id});
    this.setState({cause: cause});
  };
  submit = () => {
    let submitObj = {};
    submitObj.id = this.state.booking_id;
    submitObj.msg = this.state.cause;
    this._cancel(submitObj);
  };
  _cancel = (submitObj) => {
    let auth = "key "+this.state.loginid;
    fetch('https://webbies.co/stage/suvridhi/api/cancel-booking/', {
      method: 'POST',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": auth
      },
      body: JSON.stringify(submitObj)
    }).then(response => response.json())
    .then(resdata => {
      console.log(resdata);
      if(resdata != undefined){
        this.props.navigation.navigate('Cancelled');
      }
    }).catch(err => console.log(err));
  };
  childview = ({cid, cause}) => {
    return(
      <View style={scStyle.reasonsection}>
          <View style={scStyle.box}>
              <RadioButton 
                  value={cause} 
                  status={this.state.checked == cid ? 'checked' : 'unchecked'} 
                  onPress={this.changeStatus.bind(this, cid, cause)} />
          </View>
          <View style={scStyle.causes}>
              <Text style={scStyle.coztxt}>{cause}</Text>
          </View>
      </View>
    )
  };
  render(){
    return(
      <ScrollView style={{flex: 100, backgroundColor: '#fff', padding:10}}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={scStyle.spinnerTextStyle}
        />
        <View style={scStyle.card}>
          <Text style={scStyle.mtxt}>Select Reason</Text>
          <View style={{alignItems: 'center'}}>
              <View style={scStyle.flat}>
                  <FlatList 
                      horizontal={false}
                      data={this.state.cozdata}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item})=> <this.childview cid={item.id} cause={item.reason}/>}
                  />
              </View>
              <TouchableOpacity style={scStyle.yes} onPress={this.submit}>
                  <Text style={scStyle.ytxt}>Submit</Text>
              </TouchableOpacity>
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
   card:{
       width: 380,
       backgroundColor:'#fff',
       height: 'auto',
       marginVertical: 80,
       marginHorizontal: 8,
       shadowOpacity: 0.1,
       alignSelf: 'center',
       padding: 15
   },
    mtxt:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#354764',
        borderColor: '#354764',
        borderBottomWidth:1,
        marginBottom:0,
        paddingBottom: 5
    },
    yes:{
        backgroundColor: '#5297F1',
        borderColor: '#5297F1',
        borderWidth: 2,
        width: '100%',
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
    flat:{
        flex:100,
        flexDirection: 'row',
        marginVertical: 20
    },
    reasonsection:{
        flex:100,
        flexDirection: 'row',
    },
    box:{
        flex: 10,
        padding: 4
    },
    causes:{
        flex: 90
    },
    coztxt:{
        fontSize: 24,
        color:'#354764',
        marginTop: 4
    }
});

export default Reasons;