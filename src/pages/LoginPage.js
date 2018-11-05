import React from 'react';
import {View, Text ,TextInput, StyleSheet , Button , ActivityIndicator} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';

export default class LoginPage extends React.Component {

	constructor(props){
	super(props);
		this.state ={
			mail: '',
			password: '',
			isLoading: false,
		}
	}

	componentDidMount() {

		const config = {
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
		this.setState({isLoading: true});
		const {mail, password} = this.state;

		 firebase.auth().signInWithEmailAndPassword(mail,password).then(user =>{console.log('Easy autenticado',user);})
		 .catch(error => {console.log('not easy encontrado', error);
		}).then(() => this.setState({isLoading: false}));
	}

	renderButton(){
		if (this.state.isLoading)
			return <ActivityIndicator/>;
		return(
			<Button title= "Entrar" onPress={()=> this.tryLogin()}/>
			);
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
					{this.renderButton()}
					
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