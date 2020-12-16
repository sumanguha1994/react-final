import FBase from 'firebase';

const config =  {
  	apiKey: "AIzaSyCxvw03GRKVm_S3SaOMCh4tScKYCz0gan4",
	authDomain: "suvridhi-cda9a.firebaseapp.com",
	databaseURL: "https://suvridhi-cda9a.firebaseio.com",
	projectId: "suvridhi-cda9a",
	storageBucket: "suvridhi-cda9a.appspot.com",
	messagingSenderId: "111292387201",
	appId: "1:111292387201:web:5f4835adb197ccf6472280",
	measurementId: "G-WFQ25FWES0"
};

if( FBase.apps.length === 0 ){
let app= FBase.initializeApp(config);
var appd=app;

}
const db=appd.database();

export default db;