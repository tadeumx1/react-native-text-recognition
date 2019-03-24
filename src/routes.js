import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';

import Welcome from './pages/Welcome';
import Main from './pages/Main';

import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';

export class ScreenCheck extends Component {
  
  static navigationOptions = {

    header: null

  }  

  state = {

    userChecked: false,
    userLogged: false,

  }  

  async componentDidMount() {

    const username = await AsyncStorage.getItem('@FirebaseText:username');

    await this.appLoaded(username);

    if(this.state.userLogged == true) {

        const resetAction = StackActions.reset ({

            index: 0,
            actions: [

                NavigationActions.navigate({ routeName: 'Main' }),

            ]

        });

        this.props.navigation.dispatch(resetAction);


    } else {

        const resetAction = StackActions.reset ({

            index: 0,
            actions: [

                NavigationActions.navigate({ routeName: 'Welcome' }),

            ]

        });

        this.props.navigation.dispatch(resetAction);

    }

  }

  appLoaded = (username) => {

    this.setState({

      userChecked: true,
      userLogged: !!username,

    })

  }

  render() {

    if(!this.state.userChecked) return null;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <ActivityIndicator size="large" color="#00ff00" />

      </View>
    );
  }

}

const createNavigator = createStackNavigator (
    
    {

      ScreenCheck: { screen: ScreenCheck },

      Welcome: { screen: Welcome },

      Main: { screen: Main },

    },

);

const MainNavigator = createAppContainer(createNavigator);

export default MainNavigator;