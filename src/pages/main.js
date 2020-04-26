import React, {Component} from 'react';
import api from '../services/api';

import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: 'QrCodeValidator',
  };

  state = {
    username: '',
    password: '',
  };

  // componentDidMount() {
  //   this.validateAuth();
  // }

  // // method to validate current user
  // validateAuth = async () => {
  //   const response = await api.get();

  //   console.log(response);
  // };

  login = async () => {
    try {
      const {username, password} = this.state;
      await api.post('/login', {
        user: username,
        pass: password,
      });
      Alert.alert('Login realizado com sucesso');
      this.props.navigation.navigate('ScanScreen');
    } catch (error) {
      Alert.alert('Falha ao realizar login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Preencha suas credenciais para validar cupons!</Text>
        <TextInput
          value={this.state.username}
          onChangeText={username => this.setState({username})}
          style={styles.input}
          placeholder={'Usuário'}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          secureTextEntry={true}
          placeholder={'Senha'}
          style={styles.input}
        />
        <Button onPress={this.login.bind(this)} title="Entrar" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
