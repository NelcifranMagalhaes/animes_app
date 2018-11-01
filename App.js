import { createStackNavigator } from  'react-navigation';
import LoginPage from './src/pages/LoginPage';

export default createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions:{
    	title: 'Ohayou!!',
    }
}

 },{
 	navigationOptions:{
 		title: "Animes",
 		headerTintColor: 'white',
 		headerStyle: {
 			backgroundColor: '#6ca2f7',
 			borderBottomWidth: 1,
 			borderBottomColor: '#C5C5C5',
 		},
 		headerTitleStyle:{
 			color: 'white',
 			fontSize: 30,
 		}
 	}
 });