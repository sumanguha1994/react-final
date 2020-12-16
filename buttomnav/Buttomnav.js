import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; 
import Icon from 'react-native-vector-icons/FontAwesome5';

//screen
import HomeScreen from './home/HomeScreen';
import PictureScreen from './picture/PictureScreen';
import FormScreen from './form/FormScreen';
import AboutScreen from './about/AboutScreen';

// class Nav extends React.Component{

// }
const TabNavigator = createMaterialBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          navBarLabel: "Home",
          navBarIcon: ({ tintColor }) => {
            <View>
               <Icon style={[{color: tintColor}]} size={25} name={'home'}/> 
            </View>
          }
        }
      },
      Picture: {
        screen: PictureScreen,
        navigationOptions: {
          navBarLabel: "Picture",
          navBarIcon: ({ tintColor }) => {
            <View>
               <Icon style={[{color: tintColor}]} size={25} name={'image'}/> 
            </View>
          },
          activeColor: '#f60c0d',  
          inactiveColor: '#f65a22',  
          barStyle: {backgroundColor: '#f69b31'}
        }
      },
      Form: {
        screen: FormScreen,
        navigationOptions: {
          navBarLabel: 'Form',
          navBarIcon: ({ tintColor }) => {
            <View>
               <Icon style={[{color: tintColor}]} size={25} name={'image'}/> 
            </View>
          },
          activeColor: '#615af6', 
          inactiveColor: '#46f6d7',  
          barStyle: {backgroundColor: '#67baf6'}
        }
      },
      About: {
        screen: AboutScreen,
        navigationOptions: {
          navBarLabel: 'About Us',
          navBarIcon: ({ tintColor }) => {
            <View>
               <Icon style={[{color: tintColor}]} size={25} name={'image'}/> 
            </View>
          },
        }
      }
    }, {
      initialRouteName: 'Home',
      activeColor: '#f0edf6', 
      inactiveColor: '#226557',
      barStyle: {backgroundColor: '#3BAD87'}
    }
);

export default createAppContainer(TabNavigator);  
