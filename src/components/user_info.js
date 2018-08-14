import React,{Component } from 'react';

import { List ,Toast,NavBar, Icon} from 'antd-mobile';
import styles from '../style/user_info.css';
import userIcon from '../imgs/icon_login_user.png';
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
		
		
	}
	componentDidMount(){   // react 生命周期  挂载
		this.load();
 		
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	load(){
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
		
	
	render(){
		
		return(
			<div className={styles['app']}>
				 <NavBar
				  mode="light"
				  icon={<Icon type="left" />}
				  onLeftClick={() => this.props.history.goBack()}
				>个人信息</NavBar>
			
				<List  className="my-list" style={{marginTop:'10px',zIndex:'9'}}>
					<Item extra={this.state.userData.name}><img src={userIcon} style={{width:'15px',height:'15px'}}/></Item>
				</List>
				
				<List  className="my-list" style={{marginTop:'10px',zIndex:'9'}}>
					<Item extra={this.state.userData.divided_proportion+'%'}>分成比例</Item>
					<Item extra={this.state.userData.created}>创建时间</Item>
				</List>
			</div>
		)
	}
}

