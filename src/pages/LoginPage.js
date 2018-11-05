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
			message: '',
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
	//faz a tentativa de login do usuário no firebase
	tryLogin(){
		this.setState({isLoading: true, message: ''});
		const {mail, password} = this.state;

		 firebase.auth().signInWithEmailAndPassword(mail,password).
		 then(user =>{
		 	this.setState({message: 'Sucesso!'});
		 })
		 .catch(error => {
		 	this.setState({message: this.getMessageByErrorCode(error.code) });
		})
		 .then(() => this.setState({isLoading: false}));
	}

	//devolve uma mensagem de acordo com um código de error
	getMessageByErrorCode(errorCode){
		switch(errorCode){
			case 'auth/wrong-password':
				return 'Senha incorreta';
			case 'auth/user-not-found':
				return 'Usuário não encontrado';
			default: 
				return 'Error Desconhecido';
		}

	}
	//renderiza a mensagem
	renderMessage(){
		const {message} = this.state;
		if (!message)
			return null;
		return(
			<View>
				<Text>{message}</Text>
			</View>);
	}
	//renderiza o botão
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
					{this.renderMessage()}
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