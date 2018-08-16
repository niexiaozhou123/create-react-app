import React, { Component } from 'react';

import { NavBar, List, Toast,Icon,InputItem,Button} from 'antd-mobile';
import  axios  from '../utils/request.js';
import styles from '../style/manage_alipay_transfer.css';
import app from '../utils/app.js';
import titleIcon from '../imgs/icon-title.png';


const Item = List.Item;
const user = app.spreadUser();

export default class ManageAlipayTransfer extends Component{
	constructor(props){
		super(props);
		this.state ={
			money:'',
			pwd:'',
			alipayInfo:{},
			moneyInfo:0,
		};
		this.moneyChange = this.moneyChange.bind(this);
		this.pwdChange = this.pwdChange.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	componentDidMount(){   // react 生命周期  挂载
		this.load();
		this.getMoney();
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	load(){
		Toast.loading('正在加载数据..',1.5,null,true)
		axios.post('api/bill/getAlipay',{
			token:user.token
		})
		.then((res)=>{
			// console.log(res);
			if(res.status===0&&res.data){
				res.data.true_name = app.addStar(res.data.true_name,app.interceptStrAccordByte(res.data.true_name, 2))||'';
				this.setState({
					alipayInfo:res.data
				})
			}else if(res.data ===''||!res.data){
				Toast.offline('该账号暂未绑定支付宝信息',1.5,null,true);
				this.props.history.push('/manage_bound_alipay');
			}else{
				Toast.offline(res.msg,1.5,null,true)
			}
		})
		.catch(function (err) {
			console.error(err);
		})
	}
	getMoney(){
		axios.post('api/bill/apply',{
			token:user.token
		})
		.then((res)=>{
			// console.log(res)
			if(res.status===0&&res.data){
				res.data.money = app.spreadFormat(res.data.money);
				this.setState({
					moneyInfo:res.data.money
				})
			}else{
				Toast.offline(res.msg,1.5,null,true)
			}
		})
		.catch(function(err){
			console.log(err)
		})
	}
	moneyChange(e){
		this.setState({
			money:e
		})
	}
	pwdChange(e){
		this.setState({
			pwd:e
		})
	}
	submit(){
		if(this.state.money==''||this.state.pwd==''){
			Toast.offline('请确认信息是否完整填写!!',2,null,true)
			return;
		}
		if(Number(this.state.money)<10){
			Toast.offline('提现金额需大于10元',2,null,true)
			return;
		}
		
		Toast.offline('测试账号暂无法发起提现申请..',2,null,true)
			
		
	}
	
	render(){
		
		return(
			<div className={styles['app']}>
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
					style={{position:'fixed',top:'0',left:'0',right:'0',zIndex:'9999'}}
				>支付宝提现管理</NavBar>
				
				<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
					<Item extra={this.state.moneyInfo}>
						<label style={{paddingLeft:'15px'}}>账户余额</label>
					</Item>
					<Item>
						<InputItem
							value={this.state.money}
							type = 'number'						
							placeholder='金额不得少于10元'
							style={{zIndex:'1'}}
							maxLength='8'
							clear
							onChange={this.moneyChange}
							>提现金额</InputItem>
					</Item>
				</List>
				
				<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
					<Item>
						<img src={titleIcon} style={{width:'5px',height:'15px',paddingRight:'8px'}} alt=''/>
						<label style={{fontSize:'15px',}}>支付宝账户信息</label>
					</Item>
					<Item extra={this.state.alipayInfo.alipay}>
						<label style={{paddingLeft:'15px'}}>支付宝账户</label>
					</Item>
					<Item extra={this.state.alipayInfo.true_name}>
						<label style={{paddingLeft:'15px'}}>真实姓名</label>
					</Item>
				</List>
				
				<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
					<Item>
						<InputItem
							value={this.state.pwd}
							type = 'password'						
							placeholder='请输入结算密码'
							style={{zIndex:'1'}}
							maxLength='8'
							clear
							onChange={this.pwdChange}
							>结算密码</InputItem>
					</Item>
				</List>
				
				<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
					<Button type='ghost'  onClick={this.submit}>立即提现</Button>
				</List>
			</div>
		)
	}
}