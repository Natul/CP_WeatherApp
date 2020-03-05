import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

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

export default class login extends React.Component {
    
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
    }