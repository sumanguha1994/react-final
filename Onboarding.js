import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
//import Login from './Login';
import AsyncStorage from '@react-native-community/async-storage';

class Onboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: '',
        }
    }
    componentDidMount() {
        // AsyncStorage.getItem('first_time').then((value) => {
        //     if(value == 1){
        //         this.props.navigation.navigate('Buttomnav');
        //     }
        // });
    }
    render() {
        const { navigate } = this.props.navigation;
        return(
            <Onboarding
                onSkip={() => 
                        AsyncStorage.setItem('first_time', '1').then(() => {
                            this.setState({showRealApp: 1});
                            navigate('Login')
                        })
                    }
                onDone={() => 
                        AsyncStorage.setItem('first_time', '1').then(() => {
                            this.setState({showRealApp: 1});
                            navigate('Login')
                        })
                    }
                pages={[
                    {
                        backgroundColor: '#5192E6',
                        image: <Image 
                                    source={require('./images/obs1.png')} 
                                    style={{width: '100%',}} />,
                        title: 'Onboarding 1',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#85B9FC',
                        image: <Image source={require('./images/obs2.png')}  
                        style={{width: '100%',}}/>,
                        title: 'Onboarding 2',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#5297F1',
                        image: <Image source={require('./images/obs3.png')}  style={{width: '100%',}}/>,
                        title: 'Onboarding 2',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    }
                    
                ]}
            />
        );
    }
}
export default Onboard;