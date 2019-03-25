import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

import RNMlKit from 'react-native-firebase-mlkit';

import { Container, ButtonContainer, ButtonCapture, ButtonText, RNCameraPreview } from './styles'

export default class Main extends Component {

    static navigationOptions = {

        header: null,
    
    };
    
    state = {

        text: '',
        loading: false,
        error: null,
        
    }

    takePicture = async () => {

            const options = { base64: true, skipProcessing: true, forceUpOrientation: true };
            const data = await this.camera.takePictureAsync(options);

            // for on-device (Supports Android and iOS)

            const deviceTextRecognition = await RNMlKit.deviceTextRecognition(data.uri); 
            console.log('Text Recognition On-Device', deviceTextRecognition);

            alert('Texto identificado ' + JSON.stringify(deviceTextRecognition))

            // for cloud (At the moment supports only Android)

            // const cloudTextRecognition = await RNMlKit.cloudTextRecognition(data.uri);
            // console.log('Text Recognition Cloud', cloudTextRecognition);

    };

    render() {
      return (

        <Container>
        <RNCameraPreview
          ref={camera => {
            this.camera = camera;
          }}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <ButtonText> SNAP </ButtonText>
          </TouchableOpacity>
        </View>
      </Container>

      )
    }
    
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });