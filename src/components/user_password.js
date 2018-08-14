import React,{Component } from 'react';

import { List ,Toast,NavBar, Icon ,InputItem,Button} from 'antd-mobile';

import styles from '../style/user_password.css';
import app from '../utils/app.js';
import axios from '../utils/request.js';

const Item = List.Item;
const user = app.spreadUser();

export default class UserPwd extends Component{
	constructor(props){
		super(props);		
		this.state={
			oldPwd:'',
			newPwd:'',
			newPwds:''
		};
		this.oldPwdChange = this.oldPwdChange.bind(this);
		this.newPwdChange = this.newPwdChange.bind(this);
		this.newPwdsChange = this.newPwdsChange.bind(this);
		this.submit = this.submit.bind(this);
		
		
	}
	componentDidMount(){   // react 生命周期  挂载
		
		
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	oldPwdChange(e){
		this.setState({
			oldPwd:e
		});
	}
	newPwdChange(e){
		this.setState({
			newPwd:e
		});
	}
	newPwdsChange(e){
		this.setState({
			newPwds:e
		});
	}
	submit(){
		if(this.state.oldPwd==''||this.state.newPwd==''||this.state.newPwds==''){
			Toast.offline('请确认信息是否完整填写!!',2,null,true)
			return;
		}
		if(this.state.newPwd!=this.state.newPwds){
			Toast.offline('修改的密码两次不一致.',2,null,true)
			return;
		}
		
		axios.post('api/bind/updatePasswd',{
			token:user.token,
			dosubmit:1,
			old_passwd:this.state.oldPwd,
			new_passwd:this.state.newPwd,
			re_new_passwd:this.state.newPwds
			
		})
		.then((res)=>{
			if(res.status===0){
				Toast.success(res.msg,3,null,true)
				setTimeout(()=>{
					this.props.history.goBack();
				}, 3000);
			}else{
				Toast.fail(res.msg,3,null,true)
			}
		})
		.catch(function (err) {
			console.error(err);
		})
		
	}
	
	render(){
		return(
			<div className ={styles['app']}>
				<NavBar
				mode="light"
				icon={<Icon type="left" />}
				onLeftClick={() => this.props.history.goBack()}
				style={{position:'fixed',top:'0',left:'0',right:'0',zIndex:'9999'}}
				>登录密码</NavBar>
				
				<List className="my-list" style={{margin:'10px 0 10px 10px',width:'95%'}}>
					<InputItem
						value={this.state.oldPwd}
						type = 'password'
						maxLength = '10'
						placeholder='请输入原来的登录密码'
						style={{zIndex:'1'}}
						clear
						onChange={this.oldPwdChange}
					  >旧的密码</InputItem>
					  
					  <InputItem
					  	value={this.state.newPwd}
					  	type = 'password'
					  	maxLength = '10'
						placeholder='请输入新的登录密码'
						style={{zIndex:'1'}}
						clear
						onChange={this.newPwdChange}
					  >新的密码</InputItem>
					  
					  <InputItem
					  	value={this.state.newPwds}
					  	type = 'password'
					  	maxLength = '10'
						placeholder='请再输入一次登录密码'
						style={{zIndex:'1'}}
						clear
						onChange={this.newPwdsChange}
					  >确认密码</InputItem>
				</List>
				<Button type='ghost' style={{margin:'10px 0 10px 10px',width:'95%'}} onClick={this.submit}>修改</Button>
			</div>
		)
	}
}