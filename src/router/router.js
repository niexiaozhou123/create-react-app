import React,{Component } from 'react';
// import ReactDOM from 'react-dom';
import { Link,Route,BrowserRouter as Router} from 'react-router-dom';


//components
import Login from '../components/login';
import Home from '../components/home';
import Refresh from '../components/refresh';
import UserInfo from '../components/user_info';
import UserPwd from '../components/user_password';
import UserResult from '../components/user_result';
import UserMail from '../components/user_mail';
import ManageBoundAlipay from '../components/manage_bound_alipay';
import ManageAlipayTransfer from '../components/manage_alipay_transfer';




import NotFound from '../components/404';

 export default class Routers extends Component{
	render(){
		const { history } = this.props;
		return(
			
			<Router history={history}>
				<div>
					<Route exact path ='/' component={Login} />
					<Route path ='/home' component={Home} />
					<Route path ='/refresh' component={Refresh} />
					<Route path ='/user_info' component={UserInfo} />
					<Route path ='/user_pwd' component={UserPwd} />
					<Route path ='/user_result' component={UserResult} />
					<Route path ='/user_mail' component={UserMail} />
					<Route path ='/manage_bound_alipay' component={ManageBoundAlipay} />
					<Route path ='/manage_alipay_transfer' component={ManageAlipayTransfer} />
					
					
					
				</div>
			</Router>
		)
	}
	
}
