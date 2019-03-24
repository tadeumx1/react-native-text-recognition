import styled from 'styled-components/native'

import { RNCamera } from 'react-native-camera';

export const Container = styled.View`

    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #000;

`;

export const RNCameraPreview = styled(RNCamera)`

    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;

`;

export const ButtonContainer = styled.View`

    display: flex;
    flex: 0;
    flex-direction: row;
    justify-content: center;

`;

export const ButtonCapture = styled.TouchableOpacity`

    flex: 0;
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    padding-right: 20px;
    padding-left: 20px;
    align-self: center;
    margin: 20px;

`;

export const ButtonText = styled.Text`

    font-size: 14px;

`;