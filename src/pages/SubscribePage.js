import React from 'react';
import {View, Text ,TextInput, StyleSheet , Button , ActivityIndicator} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';

export default class SubscribePage extends React.Component {

  constructor(props){
  super(props);
    this.state ={
      mail: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      message: '',
    }
  }


  onChangeHandler(field,value){
    this.setState({
      [field]: value
    });
  }

  renderButton(){
		if (this.state.isLoading)
			return <ActivityIndicator/>;
		return(
			<Button title= "Cadastrar" onPress={()=> this.tryLogin()}/>
			);
	}

  getMessageByErrorCode(errorCode){
    switch(errorCode){
      case 'auth/email-already-in-use':
        return 'Email já usado';
      case 'auth/weak-password':
        return 'Senha muito fraca';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'passwordNotEqual':
        return 'Senha devem ser iguais';
      default:
        return 'Error Desconhecido';
    }
  }

  renderMessage(){
    const {message} = this.state;
    if (!message)
      return null;
    return(
      <View>
        <Text>{message}</Text>
      </View>);
  }

  //faz a tentativa de login do usuário no firebase
  tryLogin(){
    this.setState({isLoading: true, message: ''});
    const {mail, password, confirmPassword} = this.state;
    if (password === confirmPassword) {

      firebase.auth().createUserWithEmailAndPassword(mail,password).
      then(user =>{
        this.setState({message: 'Sucesso!'});
      })
      .catch(error => {
        this.setState({message: this.getMessageByErrorCode(error.code) });
      })
      .then(() => this.setState({isLoading: false}));
    }else {
      this.setState({message: this.getMessageByErrorCode('passwordNotEqual') });
       this.setState({isLoading: false});
    }
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
					<FormRow last>
						<TextInput style ={styles.input} placeholder="confirme a senha" secureTextEntry value={this.state.confirmPassword}
						onChangeText ={value => this.onChangeHandler('confirmPassword',value)}/>
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
