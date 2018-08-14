import React,{Component } from 'react';

import { List ,Toast,NavBar, Icon ,InputItem,Button} from 'antd-mobile';

import styles from '../style/user_mail.css';
import app from '../utils/app.js';
import axios from '../utils/request.js';

const Item = List.Item;
const user = app.spreadUser();

export default class UserMail extends Component{
	constructor(props){
		super(props);		
		this.state={
			email:'',
			
		};
		this.emailChange = this.emailChange.bind(this);	
		this.submit = this.submit.bind(this);
		
		
	}
	componentDidMount(){   // react 生命周期  挂载
		
		
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	emailChange(e){
		this.setState({
			email:e
		});
	}
	
	submit(){
		if(this.state.email==''){
			Toast.offline('请确认信息是否完整填写!!',2,null,true)
			return;
		}
		if(app.checkEmail(this.state.email) == false){
			Toast.offline('邮箱格式不正确!!',2,null,true)
			return;
		}
		
		axios.post('api/bind/email',{
			token:user.token,
			dosubmit:1,
			email:this.state.email	
		})
		.then((res)=>{
			if(res.status===0){
				Toast.success(res.msg,2,null,true)
				setTimeout(()=>{
					this.props.history.goBack();
				}, 2000);
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
				>邮箱绑定</NavBar>
				
				<List className="my-list" style={{margin:'10px 0 10px 10px',width:'95%'}}>
					<Item><label style={{fontSize:'13px'}}>提高账号的安全性,用于您的密码找回</label></Item>
					<InputItem
						value={this.state.email}
						type = 'text'						
						placeholder='请输入需要绑定的邮箱地址'
						style={{zIndex:'1'}}
						clear
						onChange={this.emailChange}
					  >绑定邮箱</InputItem>
				</List>
				<Button type='ghost' style={{margin:'10px 0 10px 10px',width:'95%'}} onClick={this.submit}>修改</Button>
			</div>
		)
	}
}