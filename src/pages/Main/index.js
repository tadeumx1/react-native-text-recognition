import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

import RNMlKit from 'react-native-firebase-mlkit';

import uuidv1 from 'uuid/v1';

const { height, width } = Dimensions.get('window')

// import { Container, ButtonContainer, ButtonCapture, ButtonText, RNCameraPreview } from './styles'

export default class Main extends Component {

    static navigationOptions = {

      header: null,
    
    };
    
    state = {

      text: [],
      modalVisible: false,
      loading: false,
      error: null,
        
    }

    takePicture = async () => {

      const options = { quality: 0.8, base64: true, skipProcessing: true, forceUpOrientation: true };
      const data = await this.camera.takePictureAsync(options);

      // for on-device (Supports Android and iOS)

      const deviceTextRecognition = await RNMlKit.deviceTextRecognition(data.uri); 
      console.log('Text Recognition On-Device', deviceTextRecognition);

      this.setState({ text: deviceTextRecognition, modalVisible: true })

      // alert('Texto identificado ' + JSON.stringify(deviceTextRecognition))

      // for cloud (At the moment supports only Android)

      // const cloudTextRecognition = await RNMlKit.cloudTextRecognition(data.uri);
      // console.log('Text Recognition Cloud', cloudTextRecognition);

    };

    handleCancel = () => {

      this.setState({ modalVisible: false })

    }

    renderModal = () => {

      const { modalVisible, text } = this.state

      return (

        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: width - 50, height: height - 70 }}>
              <ScrollView>
                {text.map(blockVision => (

                  <View key={uuidv1()}>
                    <Text>Element Text : {blockVision.elementText}</Text>
                    <Text>Line Text : {blockVision.lineText}</Text>
                    <Text>Result Text : {blockVision.resultText}</Text>
                    <Text>Block Text : {blockVision.blockText}</Text>
                  </View>

                ))}
              </ScrollView>
            </View>
            <TouchableOpacity onPress={this.handleCancel}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      )

    }

    render() {
      return (

        <View style={styles.container}>
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style = {styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        {this.renderModal()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={styles.buttonText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>

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
    buttonText: {
      fontSize: 14,
    },
    modalView: {
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });