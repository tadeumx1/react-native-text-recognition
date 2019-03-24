import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

import { StatusBar, ActivityIndicator, AsyncStorage } from 'react-native';

import { Container, Title, TextInformation, Error, Form, Input, Button, ButtonText} from './styles'

export default class Welcome extends Component {

    constructor() {
        super();
    
        this.signIn = this.signIn.bind(this);
    }

    static navigationOptions = {

        header: null,
    
    };
    

    static propTypes = {

        navigation: PropTypes.shape({
            dispatch: PropTypes.func,
        }).isRequired,

    };

    state = {

        username: '',
        loading: false,
        errorMessage: null,
        
    }

    saveUser = async (username) => {

        await AsyncStorage.setItem('@FirebaseText:username', username)

    }

    async signIn () {

        const { username } = this.state;

        if(username.length === 0 ) return;

        this.setState({ loading: true });

        try {

            await this.saveUser(username);

            const resetAction = StackActions.reset ({

                index: 0,
                actions: [
    
                    NavigationActions.navigate({ routeName: 'Main' }),
    
                ]
    
            });
    
            this.props.navigation.dispatch(resetAction);

        } catch(err) {

            this.setState({ loading: false, errorMessage: 'Usuário não existe' });

        }

    }

    render() {
      return (

        <Container>

            <StatusBar barStyle="light-content" /> 

            <Title>Bem-vindo</Title>
            <TextInformation>
        
                Para continuar, precisamos que você informe seu usuário
        
            </TextInformation>

            { !!this.state.errorMessage 
                && <Error>{this.state.errorMessage}</Error> }

            <Form>

                <Input

                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu usuário"
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    value = {this.state.username}
                    onChangeText={username => this.setState({ username })}

                />

                <Button onPress={this.signIn}>

                    { this.state.loading
                    ? <ActivityIndicator size="small" color='#FFF' />
                    : <ButtonText>Prosseguir</ButtonText> }

                </Button>

            </Form>

        </Container>

      )
    }
};