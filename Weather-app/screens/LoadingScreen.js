import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';

class LoadingScreen extends Component {

    componentDidMount(){
        this.checkIfLoggedIn();
    }
    
    checkIfLoggedIn = () =>{
        firebase.auth().onAuthStateChanged(function(user){
            if(user)
            {
                this.props.navigation.navigate('DashboardScreen');
            }
            else{
                this.props.navigation.navigate('LoginScreen');
            }
        }.bind(this)
        );
    }
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size ="large" />
            </View>
        );
    }
  
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
