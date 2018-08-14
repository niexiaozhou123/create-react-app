import React,{Component } from 'react';
// import ReactDOM from 'react-dom';
import { Link,Route,BrowserRouter as Router} from 'react-router-dom';


//components
import Login from '../components/login';
import Home from '../components/home';
import Refresh from '../components/refresh';
import UserInfo from '../components/user_info';

 export default class Routers extends Component{
	render(){
		const { history } = this.props;
		return(
			
			<Router history={history}>
				<div>
					<Route exact path ='/' component={Login}></Route>
					<Route path ='/home' component={Home}></Route>
					<Route path ='/refresh' component={Refresh}></Route>
					<Route path ='/user_info' component={UserInfo}></Route>
				</div>
			</Router>
		)
	}
	
}
