import React,{Component } from 'react';

import { List ,Toast,NavBar, Icon} from 'antd-mobile';
import styles from '../style/user_info.css';
import userIcon from '../imgs/icon_login_user.png';
import titleIcon from '../imgs/icon-title.png';
import app from '../utils/app.js';
import axios from '../utils/request.js';

const Item = List.Item;
const Brief = Item.Brief;
const user = app.spreadUser();

export default class UserInfo extends Component{
	constructor(props){
		super(props);		
		this.state={
			userData:{},
			userList:[]
		};
		this.goChangePwd = this.goChangePwd.bind(this);
		this.goChangeResule = this.goChangeResule.bind(this);
		
	}
	componentDidMount(){   // react 生命周期  挂载
		this.load();
 		
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	load(){
		Toast.loading('正在加载数据..',2,null,true)
		axios.post('api/Promoters/list',{
			token:user.token
		}).then((res)=>{
			// console.log(res);
			if(res.status ===0&&res.data){
				this.setState({
					userData:res.data.data,
					userList:res.data.divide_levels
				});
				
			}else{
				Toast.fail(res.msg,4,null,true)
			}
		}).catch(function(err){
			Toast.fail(err,4,null,true)
		})
	}
	
	goChangePwd(){
		this.props.history.push('/user_pwd')
	}
	goChangeResule(){
		this.props.history.push('/user_result')
	}
		
	
	render(){
		
		var Itemlist = (
			<List  className="my-list" style={{margin:'10px 0 10px 10px',width:'95%'}}>
				<Item ><img src={titleIcon} style={{width:'3px',height:'15px',margin:'0 5px'}}/>配额状态</Item>	
				<Item  >
					<label style={{display:'flex',justifyContent:'space-between',fontSize:'13px'}}>
						<a>比例(%)</a>
						<a>总计</a>
						<a>已用</a>
						<a>剩余</a>
					</label>					
				</Item>	
				{this.state.userList.map((item, index) => {	
					if(item.level===0){
						return;
					}
					if(item.num>-1){
						item.num = item.num;
					}else{
						item.num = '不限';
					}
					if(item.num>-1&&item.use_num>-1){
						item.yiyong = item.num -item.use_num;
					}else{
						item.yiyong= '不限';
					}
					if(item.use_num>-1){
						item.use_num = item.use_num;
					}else{
						item.use_num = '不限';
					}
					return (<Item key={index}>
								<label style={{display:'flex',justifyContent:'space-between',fontSize:'13px'}}>
									<a>{item.level}%</a>
									<a>{item.num}</a>
									<a>{item.yiyong}</a>
									<a>{item.use_num}</a>
								</label>
							</Item>);
					})}
			</List>
		);
		
		
		var changePwd = (
			<List  className="my-list" style={{margin:'10px 0 10px 10px',width:'95%',}}>
				<Item extra={<Icon type='right' />} onClick={this.goChangePwd}>登录密码修改</Item>
				<Item extra={this.state.userData.modified?'已修改':'未修改'}>修改状态</Item>
				<Item extra={this.state.userData.modified}>上次修改</Item>
			</List>
		);
		
		var changeResule = (
			<List  className="my-list" style={{margin:'10px 0 10px 10px',width:'95%',}}>
				<Item extra={<Icon type='right' />} onClick={this.goChangeResule} >结算密码修改</Item>
				<Item extra={this.state.userData.modified?'已设定':'未设定'}>设定状态</Item>
				<Item extra={this.state.userData.modified}>上次修改</Item>
			</List>
		);
		
		return(
			<div className={styles['app']}>
				 <NavBar
				  mode="light"
				  icon={<Icon type="left" />}
				  onLeftClick={() => this.props.history.goBack()}
				  style={{position:'fixed',top:'0',left:'0',right:'0',zIndex:'9999'}}
				>个人信息</NavBar>
			
				<List  className="my-list" style={{margin:'10px 0 10px 10px',width:'95%'}}>
					<Item extra={this.state.userData.name}><img src={userIcon} style={{width:'15px',height:'15px'}}/></Item>
				</List>
				
				<List  className="my-list" style={{margin:'10px 0 10px 10px',width:'95%'}}>
					<Item extra={this.state.userData.divided_proportion+'%'}>分成比例</Item>
					<Item extra={this.state.userData.created}>创建时间</Item>
				</List>
				
				{Itemlist}
				
				{changePwd}
				
				{changeResule}
				
			</div>
		)
	}
}

