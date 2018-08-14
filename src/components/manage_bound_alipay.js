import React,{Component } from 'react';

import { List ,Toast,NavBar, Icon ,InputItem,Button} from 'antd-mobile';

import styles from '../style/manage_bound_alipay.css';
import app from '../utils/app.js';
import axios from '../utils/request.js';

const Item = List.Item;
const user = app.spreadUser();

export default class UserPwd extends Component{
	constructor(props){
		super(props);		
		this.state={
			isSetPwd:null,
			alipayData:true,
			trueName:'',
			account:'',
			pwd:''
		};
		this.isSet = this.isSet.bind(this);
		this.checkAlipay = this.checkAlipay.bind(this);
		this.trueNameChange = this.trueNameChange.bind(this);
		this.accountChange = this.accountChange.bind(this);
		this.pwdChange = this.pwdChange.bind(this);
		this.submit = this.submit.bind(this);
		
		
	}
	componentDidMount(){   // react 生命周期  挂载
		this.isSet();
		this.checkAlipay();
		
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	trueNameChange(e){
		this.setState({
			trueName:e
		});
	}
	accountChange(e){
		this.setState({
			account:e
		});
	}
	pwdChange(e){
		this.setState({
			pwd:e
		});
	}
	
	isSet(){
		axios.post('api/bill/isSetPwd',{
			token:user.token,	
		})
		.then((res)=>{
			if(res.status===0){
				this.setState({
					isSetPwd:res.data.isSet,	
				})
			}else{
				Toast.fail(res.msg,3,null,true)
			}
		})
		.catch(function (err) {
			console.error(err);
		})		
	}
	
	
	checkAlipay(){
		
		axios.post('api/bill/getAlipay',{
			token:user.token,	
		})
		.then((res)=>{
			if(res.status===0){
				this.setState({
					alipayData:res.data	
				})
			}else{
				Toast.fail(res.msg,3,null,true)
			}
		})
		.catch(function (err) {
			console.error(err);
		})
		
	}
	
	submit(){
		if(this.state.trueName==''||this.state.account==''||this.state.pwd==''){
			Toast.offline('请确认信息是否完整填写!!',2,null,true)
			return;
		}
		
		
		axios.post('api/bill/binAliAccount',{
			token:user.token,
			dosubmit:1,
			true_name:this.state.trueName,
			account:this.state.account,
			re_new_passwd:this.state.pwd
			
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
				>绑定支付宝</NavBar>
				
				<div style={this.state.isSetPwd?{display:'none'}:{}}>
					<List className="my-list" style={{margin:'10px 0 10px 10px',width:'95%'}}>
						<InputItem
							value={this.state.trueName}
							type = 'text'
							maxLength = '4'
							placeholder='请输入您的真实姓名'
							style={{zIndex:'1'}}
							clear
							onChange={this.trueNameChange}
						  >真实姓名</InputItem>
						  
						  <InputItem
							value={this.state.account}
							type = 'text'
							maxLength = '10'
							placeholder='请输入支付宝账号'
							style={{zIndex:'1'}}
							clear
							onChange={this.accountChange}
						  >支付宝账号</InputItem>
						  
						  <InputItem
							value={this.state.pwd}
							type = 'password'
							maxLength = '10'
							placeholder='请输入您的结算密码'
							style={{zIndex:'1'}}
							clear
							onChange={this.pwdChange}
						  >结算密码</InputItem>
					</List>
					<Button type='ghost' style={{margin:'10px 0 10px 10px',width:'95%'}} onClick={this.submit}>绑定</Button>
				</div>
				
				
				<div style={this.state.isSetPwd?{}:{display:'none'}}>
					<List className="my-list" style={{margin:'10px 0 10px 10px',width:'95%'}}>
						<Item>支付宝账号信息</Item>
						<Item extra={this.state.alipayData.alipay}>支付宝账号</Item>
						<Item extra={this.state.alipayData.true_name}>真实姓名</Item>
						<Item extra={this.state.alipayData.ctime}>绑定时间</Item>
					</List>
				</div>
				
			</div>
		)
	}
}