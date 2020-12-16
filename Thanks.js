import React, {Component} from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet,TouchableOpacity, FlatList, Image } from 'react-native';
import Home from './Home';
class Thanks extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            service_id: this.props.route.params.service_id,
        }
    }
    render() {
        return (
            <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
                <View style={{flex: 100, flexDirection: 'column'}}>
                    <Image
                     source={require('./images/thks.png')}
                     style={scStyle.thanks}
                    />
                    <Text style={scStyle.thanksTxt}>Thanks For Booking</Text>
                    <View style={{paddingHorizontal: 20, marginTop:20}}>
                        <TouchableOpacity 
                            style={scStyle.button}
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Text style={scStyle.btntxt}>Go Back Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={scStyle.button}
                            onPress={() => this.props.navigation.navigate('BookingHistory', {service_id: this.state.service_id})}
                        >
                            <Text style={scStyle.btntxt}>Check my Bookings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const scStyle = StyleSheet.create({
    thanks:{
        alignSelf: 'center',
        marginVertical: 20
    },
    thanksTxt:{
        textAlign: 'center',
        fontSize: 60,
        color: '#354764',
        fontWeight: 'bold'
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
});
export default Thanks;