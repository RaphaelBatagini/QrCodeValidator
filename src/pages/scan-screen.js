import React, {Component} from 'react';
import api from '../services/api';

import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {
  static navigationOptions = {
    title: 'QrCodeValidator',
  };

  state = {
    loading: false,
  };

  onSuccess = async e => {
    this.setState({loading: true});
    try {
      await api.post('/validate-qrcode', {
        data: e.data,
      });

      Alert.alert(
        'Cupom validado com sucesso!',
        'Desconto concedido com sucesso.',
      );
    } catch (error) {
      Alert.alert('Falha ao validar cupom!', 'Tente novamente mais tarde.');
    }
    this.setState({loading: false});
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
        <Modal visible={this.state.loading} style={styles.modal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Validando cupom...</Text>
            <ActivityIndicator size={'large'} style={styles.modalLoader} />
          </View>
        </Modal>
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
    height: Dimensions.get('window').height / 2,
  },

  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalText: {
    fontSize: 20,
  },

  modalLoader: {
    marginTop: 20,
  },
});
