import React, {Component, useEffect} from 'react';
import { View, Text, Image, Alert, PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Buttomnav from './Buttomnav';
import Login from './Login';
import Signup from './signup';
import Onboard from './Onboarding';
import Forgotpass from './Forgotpass'; 

import RNCallKeep from 'react-native-callkeep';
import {v4 as uuidv4} from 'uuid';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

const AppStack = createStackNavigator();

const App=()=> {
  const options = {
    ios: {
      appName: 'My app name',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'phone_account_icon',
      // additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
      // Required to get audio in background when using Android 11
      foregroundService: {
        channelId: 'com.subridhhiapp',
        channelName: 'Foreground service for my app',
        notificationTitle: 'My app is running on background',
        notificationIcon: 'Path to the resource icon of the notification',
      },
    },
  };

    React.useEffect(() => {
      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        // PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS,
        // PERMISSIONS.ANDROID.READ_PHONE_STATE,
        // PERMISSIONS.ANDROID.READ_CONTACTS,
      ]).then((statuses) => {
        console.log('CAMERA', statuses[PERMISSIONS.ANDROID.CAMERA]);
        console.log('RECORD_AUDIO', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
        RNCallKeep.setup(options).then(async (accepted) => {
          RNCallKeep.setAvailable(true);
          const supportConnectionService = await RNCallKeep.supportConnectionService();
          console.log('supportConnectionService', supportConnectionService);
          
        });
      });
    }, []);
    return(
      <NavigationContainer>
        <AppStack.Navigator headerNode="none">
        <AppStack.Screen options={{headerShown: false}} name="Buttomnav" component={Buttomnav} />
          <AppStack.Screen options={{headerShown: false}} name="Onboard" component={Onboard} />
          
          <AppStack.Screen options={{headerShown: false}} name="Login" component={Login} />
          <AppStack.Screen options={{headerShown: false}} name="Signup" component={Signup} />
          <AppStack.Screen options={{headerShown: false}} name="Forgotpass" component={Forgotpass} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
export default App;
