import styled from 'styled-components/native'

import { RNCamera } from 'react-native-camera';

export const Container = styled.View`

    flex: 1;
    flex-direction: column;
    background-color: #000;

`;

export const RNCameraPreview = styled(RNCamera)`

    flex: 1;
    justify-content: flex-end;
    align-items: center;

`;

export const ButtonCapture = styled.TouchableOpacity`

    flex: 1;
    background-color: #fff;
    border-radius: 5px;
    padding: 2px;
    padding-right: 20px;
    padding-left: 20px;
    justify-content: center;
    align-self: center;
    margin: 20px;

`;

export const ButtonText = styled.Text`

    font-size: 14px;

`;