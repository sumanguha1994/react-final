import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class TermsAndCondition extends React.Component{
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
              <Text style={scStyle.homeHeading}>terms & Conditions</Text>
              <Image source={require('./images/tnc.png')} style={scStyle.logo} />
            </ImageBackground>
          </View>
          <View style={{flex: 70, flexDirection: 'column', padding: 15, marginTop: 50}}>
             <Text style={scStyle.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Text>
             <View style={scStyle.points}>
                 <Text style={scStyle.h}>01</Text>
                 <Text style={scStyle.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Text>
             </View>
             <View style={scStyle.points}>
                 <Text style={scStyle.h}>02</Text>
                 <Text style={scStyle.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Text>
             </View>
             <View style={scStyle.points}>
                 <Text style={scStyle.h}>03</Text>
                 <Text style={scStyle.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Text>
             </View>
          </View>
        </ScrollView>
    );
  }
} 

const scStyle = StyleSheet.create({
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
      homeHeading:{
        color: '#fff',
        alignSelf: 'center',
        fontSize: 28,
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    p:{
        fontSize:16,
        color: '#707070',
        lineHeight: 25
    },
    h:{
        fontSize:24,
        color:'#354764',
        fontWeight:'bold'
    },
    points:{
        marginVertical:15
    }    
});

export default TermsAndCondition;