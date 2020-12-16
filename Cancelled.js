import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, CheckBox, Alert,FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Cancelled extends React.Component{
  render(){
    return(
        <ScrollView style={{flex: 100, backgroundColor: '#fff', padding:10}}>
          <View style={scStyle.card}>
            <View style={{alignItems: 'center'}}>
                <View style={scStyle.flat}>
                    <View style={scStyle.imgpocket}>
                        <Image source={require('./images/tick.png')} style={scStyle.tick}/>
                    </View>
                </View>
                <Text style={scStyle.mtxt}>Meeting Cancelled</Text>
                <TouchableOpacity style={scStyle.yes} onPress={()=> this.props.navigation.navigate('Home')}>
                    <Text style={scStyle.ytxt}>Go Home</Text>
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
        marginTop:15,
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
        marginHorizontal:5,
        marginTop: 100
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
    },
    imgpocket:{
        width:120,
        height: 120,
        position:'relative',
        borderColor: '#5297F1',
        borderWidth: 4,
        borderRadius: 100,
        alignItems:'center',
        justifyContent: 'center'
    },
    tick:{
        
    }
});

export default Cancelled;