import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, DrawerNavigator, SafeAreaView } from 'react-navigation';
import * as firebase from 'firebase';
const Secret = require('./secret.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: Secret.apiKey,
  authDomain: Secret.authDomain,
  databaseURL: Secret.databaseURL,
  storageBucket: Secret.storageBucket
}; //I'll expose the secret for the database when I learn more about it

firebase.initializeApp(firebaseConfig);

function storeUserEmotionData(userId, emotionality) {
  firebase.database()
  .ref('users/' + userId + 'emotionality')
  .set(emotionality);
}

function setupListener(userId) {
  const emotionality = {
    gendersex: 'nothing',
    passions: 'nothing',
    values: 'nothing',
    comforts: 'nothing',
    discomforts: 'nothing'
  }

  function callback(snapshot) {
      this.setState({ 
        emotionality : Object.assign(
           emotionality, 
           snapshot.val()
         )
       });
  }

  callback = callback.bind(this);

  return firebase.database()
  .ref('users/' + userId + 'emotionality')
  .on('value', callback);
}

  /*<Text>Gender/Sexuality: Demisexual, Lesbian, Female</Text>
  <Text>Passions: Emotional Expression, Gameyness, Patterns</Text>
  <Text>Values: Humanism/Realibility, Rationality</Text>
  <Text>Comforts: Romanticism, Sarcasm, Darkness</Text>
  <Text>Discomforts: Anxiety, Anxiousness</Text>*/

class HavenScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Haven Screen</Text>
      </View>
    );
  }
}

class DiscoverScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Discover Screen</Text>
      </View>
    );
  }
}

class MessageScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Message Screen</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionality : {}
    }
  }

    componentDidMount() {
      setupListener.call(this, 0);
    }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      }}>
        <Text>Lynn</Text>
        <Text>Age: 23, Hieght: 5'10, Place: Nyc</Text>
        <Text>Sex: Transfeminine</Text>
        <Button title='edit' onPress={() => this.props.navigation.navigate('Edit')}></Button>
        <Text>-Emotionality-</Text>
        <Text>Gender/Sexuality: {this.state.emotionality.gendersex}</Text>
        <Text>Passions: {this.state.emotionality.passions}</Text>
        <Text>Values: {this.state.emotionality.values}</Text>
        <Text>Comforts: {this.state.emotionality.comforts}</Text>
        <Text>Discomforts: {this.state.emotionality.discomforts}</Text>
        <Button title='edit' onPress={() => this.props.navigation.navigate('Edit')}></Button>
        <Text>-Wholeness-</Text>
        <Text>Positivity: 234</Text>
        <Text>Strength: 195</Text>
        <Text>Uniqueness: 342</Text>
        <Text>Humanism: 500</Text>
        <Text>Freedom: 363</Text>
        <Text>Presence: 255</Text>
        <Text>Responsibility: 232</Text>
        <Text>Good-Naturedness: 204</Text>
        <Text>Rationality: 354</Text>
        <Text>Fun: 100</Text>
        <Button title='seed' onPress={() => storeUserEmotionData(0, {
            gendersex: 'Demisexual, Lesbian, Female',
            passions: 'Emotional Expression, Gameyness, Patterns',
            values: 'Humanism/Realibility, Rationality',
            comforts: 'Romanticism, Sarcasm, Darkness',
            discomforts: 'Anxiety, Anxiousness'
        })}></Button>
      </View>
    );
  }
}

class HavenMembersDrawer extends React.Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{
          flex: 1,
          backgroundColor: '#fff'
        }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <Text>Eminent Passion Bringers</Text>
          <Text>Lynn</Text>
          <Text>Saskia</Text>
          <Text>Azul</Text>
          <Text>Nanashiy</Text>
          <Button title='Post an Article' onPress={() => this.props.navigation.navigate('Article')}></Button>
        </SafeAreaView>
      </ScrollView>
    ); 
  }
}

class EditScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff'
      }}>
        <Text>Edit Screen</Text>
        <Text>Emotion: "Anxiety"</Text>
        <Text>Add a Secret:</Text>
        <TextInput>Why do you feel this way?</TextInput>
      </View>
    );
  }
}

class ArticleScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff'
      }}>
        <Text>Article of Harmony</Text>
        <Text>Addressing: Strength</Text>
        <Text>Title: </Text>
        <TextInput>Title of your Post</TextInput>
        <Text>Message</Text>
        <TextInput>Post Meaningful thoughts Here!</TextInput>
      </View>
    );
  }
}

const HavenDrawer = DrawerNavigator({
  Haven: { screen: HavenScreen }
}, {
  contentComponent: HavenMembersDrawer
});

const HavenStack = StackNavigator({
  Haven: { screen: HavenDrawer },
  Article: { screen: ArticleScreen }
});

const ProfileStack = StackNavigator({
  Profile: { screen: ProfileScreen },
  Edit: { screen: EditScreen}
});

const TabMenu = TabNavigator({
  Haven: {
    screen: HavenStack
  },
  Discover: {
    screen: DiscoverScreen
  },
  Message: {
    screen: MessageScreen
  },
  Profile: {
    screen: ProfileStack
  }
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
});

export default class App extends React.Component {
  render() {
    return <TabMenu/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});