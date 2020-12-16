import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './signup';
import Onboard from './Onboarding';
import Forgotpass from './Forgotpass'; 
import Home from './Home'; 
import Detail from './buttomnav/home/Detail';
import Calling from './Calling';
import Video from './Video';
import Schedule from './Schedule';
import Thanks from './Thanks';
import BookingHistory from './BookingHistory';
import BookingDetails from './BookingDetail';
import Profile from './Profile';
import Cancel from './Cancel';
import Cancelled from './Cancelled';
import Reasons from './Reasons';
import Settings from './Settings';
import EditProfile from './EditProfile';
import TermsAndConditions from './TermsAndCondition';
import PrivacyPolicy from './PrivacyPolicy'; 
import Feedback from './Feedback';
import Notification from './Notification';

const AppStack = createStackNavigator();

const Homestacknav = () => {
	return (
		<AppStack.Navigator headerNode="none">
			<AppStack.Screen options={{headerShown: false}} name="Home" component={Home} />
			<AppStack.Screen options={{headerShown: false}} name="Detail" component={Detail} />
			<AppStack.Screen options={{headerShown: false}} name="Schedule" component={Schedule} />
			<AppStack.Screen options={{headerShown: false}} name="Thanks" component={Thanks} />
			<AppStack.Screen options={{headerShown: false}} name="BookingHistory" component={BookingHistory} /> 
			<AppStack.Screen options={{headerShown: false}} name="BookingDetails" component={BookingDetails} /> 
			<AppStack.Screen options={{headerShown: false}} name="Profile" component={Profile} /> 
			<AppStack.Screen options={{headerShown: false}} name="Cancel" component={Cancel} /> 
			<AppStack.Screen options={{headerShown: false}} name="Cancelled" component={Cancelled} /> 
			<AppStack.Screen options={{headerShown: false}} name="Reasons" component={Reasons} /> 
			<AppStack.Screen options={{headerShown: false}} name="Calling" component={Calling} />
			<AppStack.Screen options={{headerShown: false}} name="Video" component={Video} />
			<AppStack.Screen options={{headerShown: false}} name="Feedback" component={Feedback} /> 
		</AppStack.Navigator>
	);
}

const Chatstacknav = () => {
	return (
		<AppStack.Navigator headerNode="none">
			<AppStack.Screen options={{headerShown: false}} name="Calling" component={Calling} />
			<AppStack.Screen options={{headerShown: false}} name="Video" component={Video} />
			<AppStack.Screen options={{headerShown: false}} name="Feedback" component={Feedback} /> 
		</AppStack.Navigator>
	);
}

const Notificationstacknav = () => {
	return (
		<AppStack.Navigator headerNode="none">
			<AppStack.Screen options={{headerShown: false}} name="Notification" component={Notification} /> 
		</AppStack.Navigator>
	);
}

const Settingstacknav = () => {
	return (
		<AppStack.Navigator headerNode="none">
			<AppStack.Screen options={{headerShown: false}} name="Settings" component={Settings} /> 
			<AppStack.Screen options={{headerShown: false}} name="EditProfile" component={EditProfile} /> 
			<AppStack.Screen options={{headerShown: false}} name="TermsAndConditions" component={TermsAndConditions} /> 
			<AppStack.Screen options={{headerShown: false}} name="PrivacyPolicy" component={PrivacyPolicy} /> 
			<AppStack.Screen options={{headerShown: false}} name="BookingHistory" component={BookingHistory} /> 
            <AppStack.Screen options={{headerShown: false}} name="BookingDetails" component={BookingDetails} /> 
            <AppStack.Screen options={{headerShown: false}} name="Profile" component={Profile} /> 
			<AppStack.Screen options={{headerShown: false}} name="Cancel" component={Cancel} /> 
			<AppStack.Screen options={{headerShown: false}} name="Cancelled" component={Cancelled} /> 
			<AppStack.Screen options={{headerShown: false}} name="Reasons" component={Reasons} /> 
			<AppStack.Screen options={{headerShown: false}} name="Home" component={Home} />
			<AppStack.Screen options={{headerShown: false}} name="Detail" component={Detail} />
			<AppStack.Screen options={{headerShown: false}} name="Schedule" component={Schedule} />
			<AppStack.Screen options={{headerShown: false}} name="Thanks" component={Thanks} />
		</AppStack.Navigator>
	);
}
export {Homestacknav, Chatstacknav, Notificationstacknav, Settingstacknav};