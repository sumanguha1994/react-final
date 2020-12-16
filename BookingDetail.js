import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert, FlatList, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

class BookingDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      service_id: this.props.route.params.servid,
      booking_id: this.props.route.params.bookid,
      loginid: '',
      singledata: [],
      advisor_id: '',
      serv_status: 'Open',
    }
  };
  _hideLoader = () => {
    this.setState({spinner: false});
  }
  _showLoader = () => {
    this.setState({spinner: true});
  }
  _Fetchdata = (loginid) => {
    let auth = "key "+loginid;
    this._showLoader();
    let singledata = [ ...this.state.singledata ];
    fetch('https://webbies.co/stage/suvridhi/api/single-booking/'+this.state.booking_id, {
      method: 'GET',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": auth
      }
    }).then(response => response.json())
    .then(resdata => {
      this._hideLoader();
      if(resdata){
        singledata.push(resdata);
        this.setState({serv_status: resdata.status});
        this.setState({advisor_id: resdata.advisor_id});
        this.setState({singledata}, () => {
          console.log('done');
        });
      }else{
        Toast.show("OPPS!! Advisor Not Allocated.");
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
  cancel_booking = () => {
    this.props.navigation.navigate('Cancel', {bookingid: this.state.booking_id});
  };
  goProfile = () => {
    if(this.state.advisor_id != undefined){
      this.props.navigation.navigate('Profile', {advisor_id: this.state.advisor_id});
    }else{
      Toast.show("OPPS!! Advisor Not Allocated.");
    }
  };
  _status_wise_tag = () => {
    if(this.state.serv_status == 'Open' || this.state.serv_status == 'open'){
      return (
        <>
          <View style={scStyle.Steps}>
            <View style={scStyle.step1}></View>
            <Text style={scStyle.stepName}>Service Booked</Text>
          </View>
          <View style={scStyle.gap}>
              <View style={scStyle.line}></View>
          </View>
          <View style={scStyle.Steps}>
              <View style={[scStyle.step2, {backgroundColor:'#9FC9FF'}]}></View>
              <Text style={scStyle.stepName}>Advisor Allocated</Text>
          </View>
          <View style={scStyle.gap}>
              <View style={scStyle.line}></View>
          </View>
          <View style={scStyle.Steps}>
              <View style={scStyle.step3}></View>
              <Text style={scStyle.stepName}>Call Completed</Text>
          </View>
        </>
      )
    }else{
      return (
        <>
          <View style={scStyle.Steps}>
            <View style={scStyle.step1}></View>
            <Text style={scStyle.stepName}>Service Booked</Text>
          </View>
          <View style={scStyle.gap}>
              <View style={scStyle.line}></View>
          </View>
          <View style={scStyle.Steps}>
              <View style={scStyle.step2}></View>
              <Text style={scStyle.stepName}>Advisor Allocated</Text>
          </View>
          <View style={scStyle.gap}>
              <View style={scStyle.line}></View>
          </View>
          <View style={scStyle.Steps}>
              <View style={scStyle.step3}></View>
              <Text style={scStyle.stepName}>Call Completed</Text>
          </View>
        </>
      )
    }
  };
  _status_wise_button = () => {
    if(this.state.serv_status == 'Open' || this.state.serv_status == 'open'){
      return (
        <>
          <TouchableOpacity style={scStyle.reschedule} onPress={() => this.props.navigation.navigate('Schedule', {service_id: this.state.service_id})}>
            <Text style={scStyle.btnSecTxt}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={scStyle.cancel} onPress={() => this.cancel_booking()}>
              <Text style={scStyle.btnSecTxt}>Cancel</Text>
          </TouchableOpacity>
        </>
      )
    }else if(this.state.serv_status == 'Alocated' || this.state.serv_status == 'alocated'){
      return (
        <TouchableOpacity style={scStyle.cancel} onPress={() => this.cancel_booking()}>
          <Text style={scStyle.btnSecTxt}>Cancel</Text>
        </TouchableOpacity>
      )
    }else{
      return (
        <TouchableOpacity style={scStyle.rebook} onPress={() => this.props.navigation.navigate('Schedule', {service_id: this.state.service_id})}>
          <Text style={scStyle.btnSecTxt}>Book Again</Text>
        </TouchableOpacity>
      )
    }
  };
  childview = ({iname, iadv, idesc, idate, ipic}) => {
    return (
      <View style={scStyle.card}>
        <View style={{flex:100, flexDirection: 'row'}}>
          <View style={scStyle.datebg}><Text style={scStyle.date}>{idate}</Text></View>
        </View>
        <Text style={scStyle.sname}>{iname}</Text>
        <View style={scStyle.Progress}>
            {this._status_wise_tag()}
        </View>
        <Text style={{fontSize:18, color:'#5297F1', marginVertical:8}}>Your Advisor</Text>
        <View style={{flex:100, flexDirection:'row', marginBottom:10}}>
          <View style={{flex:30}}>
            <Image style={scStyle.img} source={{uri: 'https://webbies.co/stage/suvridhi/public'+'/'+ipic}}/>
          </View>
          <View style={{flex:30}}>
            <Text style={scStyle.advname}>{iadv}</Text>
          </View>
          <View style={{flex:40}}>
            <TouchableOpacity style={scStyle.profileBtn} onPress={this.goProfile}>
                <Text style={scStyle.profileBtnTxt}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={scStyle.btnSec}>
            {this._status_wise_button()}
        </View>
      </View>
    )
  };
  render(){
    return(
      <SafeAreaView style={{flex: 100, backgroundColor: '#fff'}}>
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
            <Text style={scStyle.homeHeading}>Your Bookings</Text>
            <Image source={require('./images/booking.png')} style={scStyle.logo} />
          </ImageBackground>
        </View>
        <View style={{flex: 70, flexDirection: 'column', padding: 15, marginTop: 50}}>
          <FlatList 
            horizontal={false}
            data={this.state.singledata}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <this.childview iname={item.service_name} iadv={item.advisor_name} 
                                          idesc={item.status} idate={item.struc_date} ipic={item.advisor_pic}/>}
          />
        </View>
      </SafeAreaView>
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
      borderRadius: 10,
      height: 'auto',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      marginBottom: 15,
      shadowColor: '#2C98F0',
      elevation: 10,
      shadowRadius: 30 ,
      shadowOffset : { width: 56, height: 13},
      marginHorizontal:10
    },
    datebg:{
      backgroundColor: '#5297F1',
      borderRadius:8,
      height: 40,
      padding:8,
      flex: 100,
      marginVertical: 10,
    //   marginHorizontal: 15
    },
    date:{
      textAlign: 'center',
      fontSize: 16,
      color: '#fff',
      
    },
    sname:{
      fontSize:25,
      color: '#5297F1',
      fontWeight:'bold'
    },
    advname:{
      fontSize:20,
      color:'#5297F1',
      fontWeight: 'bold',
      textTransform: 'capitalize'
    },
    desc:{
      fontSize: 16,
      margin:8,
      color:'#A1A5AB'
    },
    profileBtn:{
        backgroundColor:'#5297F1',
        borderRadius: 8,
        padding: 8
    },
    profileBtnTxt:{
        color:'#fff',
        fontSize: 16,
        alignSelf:'center'
    },
    Progress:{
        flex: 100,
        flexDirection: 'row',
        marginVertical: 15
    },
    Steps:{
        flex:30,
        alignItems: 'center'
    },
    gap:{
        flex:5,
        alignItems: 'center'
    },
    step1:{
        height:70,
        width:70,
        borderRadius:50,
        backgroundColor:'#5297F1'
    },
    step2:{
        height:70,
        width:70,
        borderRadius:50,
        backgroundColor:'#5297F1'
    },
    step3:{
        height:70,
        width:70,
        borderRadius:50,
        backgroundColor:'#9FC9FF'
    },
    line:{
        width: 40,
        height:2,
        backgroundColor:'#5297F1',
        marginTop:35
    },
    stepName:{
        textAlign:'center',
        fontSize:16,
        color:'#5297F1',
        fontWeight:'bold',
        marginTop: 8
    },
    btnSec:{
        marginTop:15
    },
    reschedule:{
        backgroundColor:'#5297F1',
        borderRadius:12,
        alignItems:'center',
        padding:12,
        marginBottom:15
    },
    cancel:{
        backgroundColor:'#FF3030',
        borderRadius:12,
        alignItems:'center',
        padding:12,
        marginBottom:15
    },
    rebook:{
        backgroundColor:'#5297F1',
        borderRadius:12,
        alignItems:'center',
        padding:12,
        marginBottom:15
    },
    btnSecTxt:{
        color:'#fff',
        fontSize:24,
        fontWeight:'bold'
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
});

export default BookingDetail;