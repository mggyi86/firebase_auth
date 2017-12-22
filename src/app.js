import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
      firebase.initializeApp({
        apiKey: 'AIzaSyB6VJrYXEwMlvXn47U6zuQG8lJu3d_2CUg',
        authDomain: 'auth-3fc80.firebaseapp.com',
        databaseURL: 'https://auth-3fc80.firebaseio.com',
        projectId: 'auth-3fc80',
        storageBucket: '',
        messagingSenderId: '773903165754'
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }

    renderContent() {
      switch (this.state.loggedIn) {
        case true:
          return (
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          );
        case false:
          return <LoginForm />;
        default:
          return <Spinner size="large" />;
      }    
    }

    render() {
      return (
        <View>
          <Header headerText="Authentication" />
          <Card>
            <CardSection>
              {this.renderContent()}
            </CardSection>
          </Card>
          
        </View>
      );
    }
}

export default App;
