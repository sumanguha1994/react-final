import React, {Component, useState} from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, 
        TouchableOpacity, FlatList, Image, Modal, TouchableHighlight, Alert } from 'react-native';
import moment from 'moment'; 
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

class Schedule extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            spinner: false,
            modalVisible: false,
            today: moment().format("MMM Do YYYY"),
            service_id: this.props.route.params.service_id,
            select_date_id: '',
            select_time_id: '',
            loginid: '',
            select_date: '',
            select_time: '',
            dateSlot: [],
            timeSlot: []
        };
    };
    _hideLoader = () => {
      this.setState({spinner: false});
    }
    _showLoader = () => {
      this.setState({spinner: true});
    }
    setModalVisible = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    };
    _fetchDateSlot = (loginid) => {
        let auth = "key "+loginid;
        this._showLoader();
        fetch('https://webbies.co/stage/suvridhi/api/get-days', {
            method: 'GET',
            headers: {
              "Content-type": "application/json;charset=UTF-8",
              "Authorization": auth
            }
        }).then(response => response.json())
        .then(resdata => {
            this._hideLoader();
            let dateSlot = [ ...this.state.dateSlot ];
            for(let i = 0;i < resdata.day.length;i++)
            {
                let id = (i + 1);
                let day = resdata.day[i];
                let date = resdata.week[i].substring(0, 1);
                let fulldate = resdata.sevenday[i];
                dateSlot.push({id: id, day: day, date: date, fulldate: fulldate});
            }
            this.setState({dateSlot}, () => {
                console.log('done');
            });
        }).catch(err => console.log(err));
    };
    componentDidMount = () => {
        AsyncStorage.getItem('login_id').then((value) => {
            this.setState({loginid: value}, () => {
                this._fetchDateSlot(this.state.loginid);
            });
        });
    };
    getTimeSlot = (dfulldate, did) => {
        this.setState({select_date_id: did});
        let auth = "key "+this.state.loginid;
        this.setState({select_date: dfulldate});
        this.setState({timeSlot: []});
        const postval = {serviceid: this.state.service_id, date: dfulldate};
        let timeSlot = [ ...this.state.timeSlot ];
        this._showLoader();
        fetch('https://webbies.co/stage/suvridhi/api/allocation-time', {
            method: 'POST',
            headers: {
              "Content-type": "application/json;charset=UTF-8",
              "Authorization": auth
            },
            body: JSON.stringify(postval)
        }).then(response => response.json())
        .then(resdata => {
            this._hideLoader();
            let j = 100;
            for(let i = 0;i < resdata.length;i++)
            {
                let id = (j + 1);
                let time = resdata[i];
                timeSlot.push({id: id, time: time});
                j++;
            }
            this.setState({timeSlot}, () => {
                console.log('done');
            });
        }).catch(err => console.log(err));
    };
    selectTime = (stime, did) => {
        this.setState({select_time: stime});
        this.setState({select_time_id: did});
    };
    submit = () => {
        let auth = "key "+this.state.loginid;
        let bookingdate_time = this.state.select_date+' '+this.state.select_time+':00';
        const submitObj = {bookingtime: bookingdate_time, serviceid: this.state.service_id, userid: this.state.loginid};
        this._showLoader();
        fetch('https://webbies.co/stage/suvridhi/api/book-me', {
            method: 'POST',
            headers: {
              "Content-type": "application/json;charset=UTF-8",
              "Authorization": auth
            },
            body: JSON.stringify(submitObj)
        }).then(response => response.json())
        .then(resdata => {
            this._hideLoader();
            console.log('done');
            this.props.navigation.navigate('Thanks', {service_id: this.state.service_id});
        }).catch(err => console.log(err));
    }
    childView1 = ({did, dday , ddate, dfulldate}) => {
        return(
            (did == this.state.select_date_id) ? 
            <TouchableOpacity style={scStyle.dateSlot2} onPress={this.getTimeSlot.bind(this, dfulldate, did)}>
                <Text style={scStyle.day}>{dday}</Text>
                <Text style={scStyle.date}>{ddate}</Text>
            </TouchableOpacity>  :
            <TouchableOpacity style={scStyle.dateSlot} onPress={this.getTimeSlot.bind(this, dfulldate, did)}>
                <Text style={scStyle.day}>{dday}</Text>
                <Text style={scStyle.date}>{ddate}</Text>
            </TouchableOpacity>
        )
    };
    childView2 = ({did, dtime}) => {
        return(
            (did == this.state.select_time_id) ? 
            <TouchableOpacity style={{flex:100, flexDirection:'column', alignSelf: 'center', paddingLeft: 3}}>
                <View style={{flex:50}}>
                    <TouchableOpacity style={scStyle.timeSlot2}>
                        <Text style={scStyle.time} onPress={this.selectTime.bind(this, dtime, did)}>{dtime}</Text>
                    </TouchableOpacity>
                </View> 
                <View style={{flex:50}}>
                    <TouchableOpacity style={scStyle.timeSlot2}>
                        <Text style={scStyle.time} onPress={this.selectTime.bind(this, dtime, did)}>{dtime}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>  :
            <TouchableOpacity style={{flex:100, flexDirection:'column', alignSelf: 'center', paddingLeft: 3}}>
                <View style={{flex:50}}>
                    <TouchableOpacity style={scStyle.timeSlot}>
                        <Text style={scStyle.time} onPress={this.selectTime.bind(this, dtime, did)}>{dtime}</Text>
                    </TouchableOpacity>
                </View> 
                <View style={{flex:50}}>
                    <TouchableOpacity style={scStyle.timeSlot}>
                        <Text style={scStyle.time} onPress={this.selectTime.bind(this, dtime, did)}>{dtime}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    };
    
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
                    source={require('./images/back2.png')}
                    style={scStyle.backgroundImage}
                    >
                            <Text style={scStyle.homeHeading}>Set Up Date and Time</Text>
                            <Image style={scStyle.clock} source={require('./images/clock.png')}></Image>
                            <Text style={scStyle.bannertxt}>Advisor takes time depends on Advisory Services</Text>
                    </ImageBackground>
                </View>
                <View style={{flex: 70, flexDirection: 'column', paddingHorizontal: 20}}>
                    <FlatList
                        horizontal={true}
                        data={this.state.dateSlot}
                        keyExtractor= {item => {return item.id.toString()}}
                        renderItem={({item}) => <this.childView1 did={item.id} dday={item.day} ddate={item.date} dfulldate={item.fulldate}/>}
                    />
                    <Text style={scStyle.subCap}>Today, {this.state.today}</Text>
                    <FlatList
                        horizontal={true}
                        data={this.state.timeSlot}
                        keyExtractor= {item => {return item.id.toString()}}
                        renderItem={({item}) => <this.childView2 did={item.id} dtime={item.time}/>}
                    />
                    <View style={{flex:100, flexDirection: "row", marginVertical: 15}}>
                        <TouchableOpacity 
                            style={scStyle.button}
                            onPress={this.submit}
                        >
                            <Text style={scStyle.btntxt}>Book Now</Text>
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
    backgroundImage: {
        resizeMode: 'contain',
        justifyContent: 'center',
        height: '100%'
    },
    homeHeading:{
        color: '#fff',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: "bold",
        marginTop: -20
    },
    bannertxt:{
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center',
        marginTop: -50
    },
    clock:{
        alignSelf: 'center',
        width: 180,
        height: 180,
        marginTop: -20,
        marginBottom: 30
    },
    dateSlot:{
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop :10,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 18,
        shadowColor: '#2C98F0',
        elevation: 10,
        shadowRadius: 30 ,
        shadowOffset : { width: 56, height: 13},
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    dateSlot2:{
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop :10,
        marginBottom: 20,
        backgroundColor: '#a6a6a6',
        borderRadius: 18,
        shadowColor: '#2C98F0',
        elevation: 10,
        shadowRadius: 30 ,
        shadowOffset : { width: 56, height: 13},
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    timeSlot:{
        alignItems:'center',
        paddingVertical: 20,
        paddingHorizontal:20,
        marginTop :5,
        marginBottom: 15,
        marginHorizontal:13,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#2C98F0',
        elevation: 10,
        shadowRadius: 30 ,
        shadowOffset : { width: 56, height: 13},
    },
    timeSlot2:{
        alignItems:'center',
        paddingVertical: 20,
        paddingHorizontal:20,
        marginTop :5,
        marginBottom: 15,
        marginHorizontal:13,
        backgroundColor: '#a6a6a6',
        borderRadius: 10,
        shadowColor: '#2C98F0',
        elevation: 10,
        shadowRadius: 30 ,
        shadowOffset : { width: 56, height: 13},
    },
    day:{
        fontSize : 20,
        marginVertical: 5,
        textTransform: 'uppercase'
    },
    date:{
        fontSize : 30,
        marginVertical: 5
    },
    time:{
        fontSize: 22,
        alignSelf: 'center'
    },
    subCap:{
        fontSize: 30,
        color: '#354764',
        fontWeight: 'bold',
        marginVertical: 10
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
export default Schedule;