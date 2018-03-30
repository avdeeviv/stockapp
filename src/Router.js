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
                        titleStyle={ styles.titleStyle }
                        component={MainPage}
                    />
                </Stack>     
            </Router>
        );
    }  
  
};

const styles = {
    titleStyle: {
        ...Platform.select(
            {
                ios: {
                    paddingLeft: 20
                },
                android: {
                    alignSelf: "center",
                    paddingLeft: 60
                }
            }
        )
    }
}

export default RouterComponent;
  