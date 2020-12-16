import React, {Component, useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Homestacknav, Chatstacknav, Notificationstacknav, Settingstacknav } from './Stacknav';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator(); 

const Buttomnav = () => {
	return (
		<Tab.Navigator initialRouteName="Home" tabBarOptions={{activeTintColor: '#5297F1'}}>
			<Tab.Screen 
				name="Home" 
				component={Homestacknav} 
				options={{
			      tabBarLabel: 'Home',
			      tabBarIcon: ({ color, size }) => (
			        <MaterialCommunityIcons name="home" color={color} size={size} />
			      ),
			    }}
			/>
			<Tab.Screen 
				name="Chat" 
				component={Chatstacknav} 
				options={{
			      tabBarLabel: 'Chat',
			      tabBarIcon: ({ color, size }) => (
			        <MaterialCommunityIcons name="chat" color={color} size={size} />
			      ),
			    }}
			/>
			<Tab.Screen 
				name="Notification" 
				component={Notificationstacknav} 
				options={{
			      tabBarLabel: 'Notification',
			      tabBarIcon: ({ color, size }) => (
			        <MaterialCommunityIcons name="notification-clear-all" color={color} size={size} />
			      ),
			    }}
			/>
			<Tab.Screen 
				name="Settings" 
				component={Settingstacknav} 
				options={{
			      tabBarLabel: 'Settings',
			      tabBarIcon: ({ color, size }) => (
			        <MaterialCommunityIcons name="card-bulleted-settings" color={color} size={size} />
			      ),
			    }}
			/>
		</Tab.Navigator>
	);
}

export default Buttomnav;