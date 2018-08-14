import React, { Component } from 'react';

import { List, InputItem, Toast ,Button  } from 'antd-mobile';

import  axios  from '../utils/request.js';

import styles from '../style/login.css';
// import ReactDOM from 'react-dom';

// icon
import userIcon from '../imgs/icon_login_user.png';
import pwdIcon from '../imgs/icon_login_pwd.png';


export default class Login extends Component{
	
	constructor(props){    // react 生命周期  构造函数 
		super(props);
		this.state = {
			formuser:'',
			formpwd:'',
			user:{}			
		};
		
		
		this.onChangeUser = this.onChangeUser.bind(this);	
		this.onChangePwd = this.onChangePwd.bind(this);
		this.Submit = this.Submit.bind(this);
	
	}
	
	componentDidMount(){   // react 生命周期  挂载
		if(localStorage['spread_user']){
			this.setState({
				formuser:localStorage['spread_user']
			})
		}
	}
	componentWillUnmount(){  // react 生命周期  卸载
		// document.getElementByClassNames('app').className = '';
	}
	
	onChangeUser(e){
		this.setState({
			formuser:e
		})
	}
	
	onChangePwd(e){
		this.setState({
			formpwd:e
		})
		
	}
	Submit(e){
		if(!this.state.formuser||!this.state.formpwd){
			Toast.offline('用户名/密码不能为空!!',2,null,true);	
			return;
		}
		// console.log(this.props);
		axios.post('api/login/checklogin',{
			username:this.state.formuser,
			password:this.state.formpwd
		})
		.then((res)=>{
			// console.log( this.props)
			if(res.status===0){
				this.setState({					
					user:{
						nickName: res.data.name || '',
						userName: res.data.name || '',
						token: res.data.token || '',
						group: res.data.source_group || '',
						channel: res.data.source || '',
						zongdai: res.data.isZongdai || false
					}
				});
				//存储数据到缓存
					localStorage.setItem('spread_user',res.data.name);	
					sessionStorage.setItem ('spread_user',JSON.stringify(this.state.user));
					//重定向过去
					this.props.history.replace('/home')
		
			}else{
				Toast.fail(res.msg,4,null,true);	
			}
		})
		.catch((err)=>{
			Toast.fail(err,4,null,true);	
		})
	}
	
	
	
	
	
	
	render(){
		
		 /*
			.css
		 */
		
		
		var btnStyle ={
			marginTop:'30px',
			background:'#fff',
			border:'none',
			color:'rgb(54,124,194)'
		};
		
		var iconStyle = {
			width:'20px',
			height:'20px'
		};
		
		
		//
		
		
		return(
			<div className={styles['app']} >
				<div className={styles['from']}>
					<List>					
						<InputItem type='text' value={this.state.formuser} placeholder='请输入用户名' clear onChange={this.onChangeUser}>
							<img src={userIcon}  style={iconStyle} alt=''/>
						</InputItem>
						<InputItem type='password' value={this.state.formpwd}  placeholder='请输入密码' clear onChange={this.onChangePwd}>
							<img src={pwdIcon}  style={iconStyle} alt=''/>
						</InputItem>					
					</List>
					<Button  type="default" className='am-button-borderfix' style={btnStyle} onClick={this.Submit}>登 录</Button>	
				</div>
			</div>
		)
	}
}
