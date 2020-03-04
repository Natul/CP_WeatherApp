import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { fetchOpenWeatherCity, fetchOpenWeatherGPS } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

//import {Permissions} from 'expo';

import SearchInput from './components/SearchInput';


import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyBK-9HlmydgIfpRvMR1GCuW5CyZx8LVtfc",
    authDomain: "weather-app-3abce.firebaseapp.com",
    databaseURL: "https://weather-app-3abce.firebaseio.com",
    projectId: "weather-app-3abce",
    storageBucket: "weather-app-3abce.appspot.com",
    messagingSenderId: "871433469116"
};
firebase.initializeApp(firebaseConfig);

import {Container, Content, Header, Form, Input, Item, Button, Label}from 'native-base'

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email:'',
      password:''
    })
  }
  signUpUser = (email,password)=>{

    try{

      if(this.state.password.length<6){
        alert("Please enter atleast 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email,password)
    }
    catch(error)
    {
      console.log(error.toString())
    }
  }

  loginUser = (email,password)=>{

    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        console.log(user)
      })

    }catch(error)
    {
      console.log(error.toString())
    }

  }

  render(){
    return(
      <Container style={style.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email)=>this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password)=>this.setState({password})}
            />
          </Item>

          <Button style={{marginTop:10}}
          full
          rounded
          success
          onPress={()=> this.loginUser(this.state.email,this.state.password)}
          >
            <Text style ={{color : 'white'}}>Login</Text>
          </Button>

          <Button style={{marginTop:10}}
          full
          rounded
          success
          onPress={()=> this.signUpUser(this.state.email,this.state.password)}
          >
            <Text style ={{color : 'white'}}>Sign Up</Text>
          </Button>
        </Form>
      </Container>

    );
  }

  /*state = {
      loading: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    };

  componentDidMount() {
    this.handleGetLocation();
  }

  handleGetLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({error: true});
    }
    const {coords} = await Location.getCurrentPositionAsync({});
    this.handleUpdateGPS(coords);
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const { location, weather, temperature } = await fetchOpenWeatherCity(city);
        
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  handleUpdateGPS = async coords => {
    if (!coords) return;
    this.setState({ loading: true }, async () => {
      try {
        const { location, weather, temperature } = await fetchOpenWeatherGPS(coords);
        
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };  

  render() {
    const { loading, error, location, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }*/
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
