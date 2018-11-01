import React from 'react';
import {View, Text ,TextInput, StyleSheet , Button } from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';
export default class LoginPage extends React.Component {

	constructor(props){
	super(props);
		this.state ={
			mail: '',
			password: '',
		}
	}

	componentDidMount() {
		var config = {
		   apiKey: "AIzaSyC7iIgJaPptPYAj7cn63YKVAFBrfQv_LAU",
		   authDomain: "animes-92703.firebaseapp.com",
		   databaseURL: "https://animes-92703.firebaseio.com",
		   projectId: "animes-92703",
		   storageBucket: "animes-92703.appspot.com",
		   messagingSenderId: "993488696321"
		 };
		 firebase.initializeApp(config);
	}

	onChangeHandler(field,value){
		this.setState({
			[field]: value
		});
	}

	tryLogin(){
		console.log(this.state);
	}

	render(){
		return (
				<View style={styles.container}>
					<FormRow first>
						<TextInput style ={styles.input} placeholder="email" value={this.state.mail} 
						onChangeText ={value => this.onChangeHandler('mail',value)}/>
					</FormRow>
					<FormRow last>
						<TextInput style ={styles.input} placeholder="senha" secureTextEntry value={this.state.password} 
						onChangeText ={value => this.onChangeHandler('password',value)}/>
					</FormRow>

					<Button title= "Entrar" onPress={()=> this.tryLogin()}/>
				</View>
			)
	}
}

const styles = StyleSheet.create({
	container:{
		paddingLeft: 10,
		paddingRight: 10,
	},

	input: {
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 5,
	}
});