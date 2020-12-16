import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {

	register = (onRegister, onNotification, onOpenNotification) => {
		this.checkPermission(onRegister);
		this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
	}

	registerAppWithFCM = async() => {
		if(Platform.OS === 'ios'){
			await messaging().resgisterDeviceForRemoteMessages();
			await messaging().setAutoInitEnabled(true);
		}
	}

	checkPermission = (onRegister) => {
		messaging().hasPermission()
		.then(enabled => {
			if(enabled){
				//user has permission
				this.getToken(onRegister);
			}else{
				//user doesn't have permission
				this.requestPermission(onRegister);
			}
		}).catch(error => {
			console.log("[FCMService] Permision Rejected.", error);
		});
	}

	getToken = (onRegister) => {
		messaging().getToken()
		.then(fcmtoken => {
			if(fcmtoken){
				onRegister(fcmtoken);
			}else{
				console.log("[FCMService] User doesn't have a device token");
			}
		}).catch(error => {
			console.log("[FCMService] getToken rejected.", error);
		})
	}

	requestPermission = (onRegister) => {
		messaging().requestPermission()
		.then(() => {
			this.getToken(onRegister);
		}).catch(error => {
			console.log("[FCMService] request permission rejected", error);
		})
	}

	deleteToken = () => {
		console.log("[FCMService] deleteToken");
		messaging().deleteToken()
		.catch(error => {
			console.log("[FCMService] Delete token error", error);
		})
	}

	createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
		//when the application is running, but in the background 
		messaging().onNotificationOpenedApp(remoteMessage => {
			console.log("[FCMService] onNotificationOpenedApp Notification caused app to open from background state", remoteMessage);
			if(remoteMessage) {
				const notification = remoteMessage.notification;
				onOpenNotification(notification);
			}
		});

		//when the application is oppened from a quit state
		messaging().getInitialNotification()
		.then(remoteMessage => {
			console.log("[FCMService] getInitialNotification Notification caused app to open from quit state", remoteMessage);
			if(remoteMessage) {
				const notification = remoteMessage.notification;
				onOpenNotification(notification);
			}
		});

		// foreground state message
		this.messageListener = messaging().onMessage(async remoteMessage => {
			console.log("[FCMService] A new FCM message arrived: ", remoteMessage);
			if(remoteMessage) {
				let notification = null;
				if(Platform.OS === 'ios'){
					notification = remoteMessage.data.notification;
				}else{
					notification = remoteMessage.notification;
				}
				onNotification(notification);
			}
		});

		//triggered when have new message
		messaging().onTokenRefresh(fcmtoken => {
			console.log("[FCMService] new token refresh: ", fcmtoken);
			onRegister(fcmtoken);
		});
	}

	unRegister = () => {
		this.messageListener();
	}
}

export const fcmService = new FCMService();
