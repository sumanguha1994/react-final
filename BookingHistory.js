import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Alert, FlatList, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

class BookingHistory extends React.Component{
	constructor (props) {
		super(props);
		this.state = {
      servid: this.props.route.params.service_id,
      spinner: false,
			book_history: [],
      loginid: ''
		};
	}
  _hideLoader = () => {
    this.setState({spinner: false});
  }
  _showLoader = () => {
    this.setState({spinner: true});
  }
  _FetchHistory(loginid) {
    let auth = "key "+loginid;
    this._showLoader();
  	let book_history = [ ...this.state.book_history ];
		let url = 'https://webbies.co/stage/suvridhi/api/user-booking/';
		fetch(url+loginid, {
			method: 'GET',
			headers: {
          "Content-type": "application/json;charset=UTF-8",
          "Authorization": auth
      },
		}).then(response => response.json())
		.then(resdata => {
      this._hideLoader();
			if(resdata.msg != 'No Booking Found!!'){
				book_history = resdata;
        this.setState({book_history}, () => {
          console.log('done');
        });
			}else{
        Toast.show("OPPS !! "+resdata.msg);
        this.props.navigation.navigate('Schedule', {service_id: this.state.servid});
      }
		}).catch(err => console.log(err));
	}
	componentDidMount () {
    AsyncStorage.getItem('login_id').then((value) => {
      this.setState({loginid: value}, () => {
        this._FetchHistory(this.state.loginid);
      });
    });
	};
  goDetails = (bookid) => {
    this.props.navigation.navigate('BookingDetails', {servid: this.state.servid, bookid: bookid});
  };
	childview = ({ibookid, iname, iadv, idesc, idate, ipic}) => {
		return (
		  <TouchableOpacity onPress={this.goDetails.bind(this, ibookid)} style={scStyle.card}>
		    <View style={{flex:100, flexDirection: 'row'}}>
		      <View style={{flex:40}}></View>
		      <View style={scStyle.datebg}><Text style={scStyle.date}>{idate}</Text></View>
		    </View>
		    <Text style={scStyle.sname}>{iname} Services</Text>
		    <Text style={{fontSize:14, color:'#A8A8A8', marginBottom:8}}>With</Text>
		    <View style={{flex:100, flexDirection:'row', marginBottom:10}}>
		      <View style={{flex:30}}>
		        <Image source={{uri: 'https://webbies.co/stage/suvridhi/public'+'/'+ipic}} style={scStyle.img}/>
		      </View>
		      <View style={{flex:70}}>
		      <Text style={scStyle.advname}>{iadv}</Text>
		      </View>
		    </View>
		    <Text style={scStyle.desc}>{idesc}</Text>
		  </TouchableOpacity>
		)
	};
	render() {
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
		        <Text style={scStyle.heading}>Your Current Booking</Text>
		        <FlatList 
		          horizontal={false}
		          data={this.state.book_history}
		          keyExtractor={item => item.booking_id.toString()}
		          renderItem={({item}) => <this.childview ibookid={item.booking_id} iname={item.service_name} iadv={item.advisor_name} 
		                                        idesc={item.booking_status} idate={item.booking_date} ipic={item.profilepic}/>}
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
      paddingHorizontal: 10,
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
      flex: 60,
      marginVertical: 10
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
export default BookingHistory;

{/* https://webbies.co/stage/suvridhi/api/user-booking/ */}
