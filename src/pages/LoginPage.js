import React from 'react';
import {View, Text ,TextInput, StyleSheet } from 'react-native';
import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
	render(){

		return (
				<View>
					<FormRow>
						<TextInput style ={styles.input} placeholder="email"></TextInput>
					</FormRow>
					<FormRow>
						<TextInput style ={styles.input} placeholder="senha" secureTextEntry></TextInput>
					</FormRow>

				</View>
			)
	}
}

const styles = StyleSheet.create({
	input: {
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 5,
	}
});