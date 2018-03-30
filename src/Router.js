import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import MainPage from './components/MainPage';

class RouterComponent extends Component {

    render() {
        return (
            <Router>
                <Stack key="main">
                    <Scene
                        key="mainpage"
                        title="Stocks"
                        titleStyle={ { alignSelf: "center", paddingLeft: 60 } }
                        component={MainPage}
                    />
                </Stack>     
            </Router>
        );
    }  
  
};

export default RouterComponent;
  