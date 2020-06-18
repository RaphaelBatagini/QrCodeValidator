import React, {Component} from 'react';
import api from '../services/api';

import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Main extends Component {
  static navigationOptions = {
    title: 'QrCodeValidator',
  };

  state = {
    username: '',
    password: '',
    logged: false,
    partner: null,
  };

  componentDidMount() {
    AsyncStorage.getItem('@currentUser').then(user => {
      this.login(null, JSON.parse(user));
    });
  }

  login = async (_, currentUser) => {
    try {
      let username, password;
      if (currentUser) {
        username = currentUser.user;
        password = currentUser.pass;
      } else {
        username = this.state.username;
        password = this.state.password;
      }

      if (!username && !password) {
        return;
      }

      const response = await api.post('/login', {
        user: username,
        pass: password,
      });

      if (!currentUser) {
        await this.saveCurrentUser(username, password);
      }

      if (response.data) {
        this.setState({partner: response.data.user});
      }

      Alert.alert('Login realizado com sucesso');
      this.setState({logged: true});
      this.props.navigation.navigate('ScanScreen', {
        userId: this.state.partner.ID,
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert('Falha ao realizar login');
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({logged: false});
    } catch (error) {
      console.log(error);
    }
  };

  goToCamera() {
    this.props.navigation.navigate('ScanScreen', {
      userId: this.state.partner.ID,
    });
  }

  async saveCurrentUser(user, pass) {
    try {
      const data = JSON.stringify({user, pass});
      await AsyncStorage.setItem('@currentUser', data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async getCurrentUser() {
    try {
      const user = await AsyncStorage.getItem('@currentUser');
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return !this.state.logged ? (
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
    ) : (
      <View style={styles.container}>
        <Button onPress={this.logout.bind(this)} title="Sair" />
        <Button onPress={this.goToCamera.bind(this)} title="Abrir Câmera" />
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
