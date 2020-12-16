import React, {Component} from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet,TouchableOpacity, FlatList, Image } from 'react-native';
import Detail from './Detail';

class HomeScreen extends React.Component {
    mydata = [
        {id: 1, title: 'Pension', des: 'To make our call more productive', img: "../../images/opt1.png"},
        {id: 2, title: 'Mortgage', des: 'To make our call more productive', img: "../../images/opt1.png"},
        {id: 3, title: 'Advisory', des: 'To make our call more productive', img: "../../images/opt1.png"}
      ]
      ChildView = ({dtitle, dDes, dpic}) => {
        return (
          <View style={scStyle.container}>
            <View style={scStyle.vew1}>
            <ImageBackground 
              source={require('../../images/opt1.png')}
              style={scStyle.backgroundImage}
            >
            </ImageBackground>
            </View>
            <View style={scStyle.vew2}>
              <Text style={scStyle.txt1}>{dtitle}</Text>
              <Text style={scStyle.txt2}>{dDes}</Text>
              <TouchableOpacity 
                  style={scStyle.CardBtn}
                  onPress={() => submit()}
              >
                  <Text style={scStyle.btntxt}>View Details</Text>
              </TouchableOpacity> 
            </View>
          </View>
        )
      };
    render() {
        return (
            <ScrollView style={{flex: 100, backgroundColor: '#fff'}}>
                <View style={{flex: 30, flexDirection: 'column', height: 290}}>
                    <ImageBackground 
                    source={require('../../images/home.png')}
                    style={scStyle.backgroundImage}
                    >
                    </ImageBackground >
                </View>
                <View style={{flex: 70, flexDirection: 'column', paddingHorizontal: 20}}>
                    <Text style={scStyle.homeHeading}>Topics for Discussion</Text>
                    <Text style={scStyle.homeP}>To make our call more productive select topics you want to discuss</Text>
                    <View style={{flex:100, flexDirection: "row", marginVertical: 10}}>
                        <View style={{flex:60, flexDirection: "column"}}>
                            <Text style={scStyle.recoTopic}>Full Financial review</Text>
                            <Text style={scStyle.reco}>Recommended</Text>
                        </View>
                        <View style={{flex:40, flexDirection: "column"}}>
                            <TouchableOpacity 
                                style={scStyle.button}
                                onPress={() => submit()}
                            >
                                <Text style={scStyle.btntxt}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={scStyle.choose}> Or Choose Something Specific</Text>
                </View>
                <FlatList
                    horizontal={true}
                    data={this.mydata}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <this.ChildView dtitle={item.title} dDes={item.des} dpic={item.img}/>}
                    style={{marginBottom:50}}
                />
            </ScrollView>
        )
    }
}
const scStyle = StyleSheet.create({
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
export default HomeScreen;