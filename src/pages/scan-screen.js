import React, {Component} from 'react';

import {Text, StyleSheet, Alert, View, Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {
  static navigationOptions = {
    title: 'QrCodeValidator',
  };

  state = {};

  onSuccess = e => {
    Alert.alert(e.data);
  };

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          checkAndroid6Permissions={true}
          bottomContent={
            <View style={styles.touchable}>
              {this.state.success && (
                <Text style={styles.text}>Validar QRCode de cupom!</Text>
              )}
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  touchable: {
    padding: 16,
  },

  text: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  cameraContainer: {
    height: Dimensions.get('window').height,
  },
});
