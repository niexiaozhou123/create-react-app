import React, { Component } from 'react';

import { Drawer, List, NavBar, Icon, Button} from 'antd-mobile';


import  axios  from '../utils/request.js';

import styles from '../style/home.css';

import Menus from '../utils/menus';

import navbarImg from '../imgs/icon_login_user.png';



export default class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			openLeft:false,
			openRight:false,
		};
		
		this.leftOpenChange = this.leftOpenChange.bind(this);
		this.rightOpenChange = this.rightOpenChange.bind(this);
		// this.goPath = this.goPath.bind(this);
	}
	
	componentDidMount(){   // react 生命周期  挂载
		
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	leftOpenChange(e){
		this.setState({
			openLeft:!this.state.openLeft
		});
	}
	rightOpenChange(e){
		this.setState({
			openRight:!this.state.openRight
		});
	}
	goPath(item){
		if(item){
			this.props.history.push(item.path);
		}
		// console.log(item)
	}
	render(){
		
		
		const sidebar = (<List style={{width:'250px',overflowY:'auto',background:'#ffffff',}}>
				<List.Item style={{background:'rgb(16,142,233)',}}>
					<a><strong >代理系统</strong></a><Icon type='cross' size='md' style={{position:'absolute',right:'15px',zIndex:'2'} } onClick={this.leftOpenChange}/>
				</List.Item>
			  {Menus.left.map((item, index) => {								
				return (<List.Item key={index}
				  thumb={item.img}			  
				  onClick={()=>this.goPath(item)}	
				  style={{margin:'10px 0'}}
				  align='top'
				  extra={<Icon type='right' size='md'  />}
				>{item.name}</List.Item>);
			  })}
			</List>);
			
		const sidebar2 = (<List style={{width:'250px',overflowY:'auto',background:'#ffffff',}}>
				<List.Item style={{background:'rgb(16,142,233)',}}>
					<a><strong >用户</strong></a><Icon type='cross' size='md' style={{position:'absolute',right:'15px',zIndex:'2'} } onClick={this.rightOpenChange}/>
				</List.Item>
			{Menus.right.map((item, index) => {								
				return (<List.Item key={index}
				thumb={item.img}								  
				onClick={()=>this.goPath(item)}	
				style={{margin:'10px 0'}}
				align='bottom'
				extra={<Icon type='right' size='md'  />}
				>{item.name}</List.Item>);
			})}
			</List>);
			
		const child = (
			<p></p>
			);
			
		var btn = {
			width:'100%',
			zIndex:'1',
			marginLeft:'30px'
		};
		
		
		
		
		
		return(
			<div className={styles['app']}>
				<NavBar mode='light'
					leftContent={[
					<Icon type="ellipsis" style={{zIndex:'2'}}/>,
					<label style={{zIndex:'2'}}>菜单</label>
					]}
					onLeftClick={this.leftOpenChange}
					rightContent={[
						// <Icon key="0" type="search" style={btn} onClick={this.rightOpenChange}/>,
						<img src={navbarImg} style={{width:'20px',height:'20px',background:'#ffffff',zIndex:'2'}} onClick={this.rightOpenChange}/>,
						<label style={{zIndex:'2'}} onClick={this.rightOpenChange}>info</label>						
					]}
// 					
				>HOME</NavBar>
				
				
				<Drawer
					className="my-drawer"
					style={{ minHeight: document.documentElement.clientHeight, }}
					enableDragHandle
					contentStyle={{   textAlign: 'center', paddingTop: 42 }}
					sidebar={sidebar}
					open={this.state.openLeft}
					onOpenChange={this.leftOpenChange}
					children={child}
					
				  >					
				  </Drawer>
				  
				  <Drawer
				  	className="my-drawer"
				  	style={{ minHeight: document.documentElement.clientHeight }}
				  	enableDragHandle
					position ='right'
				  	contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
				  	sidebar={sidebar2}
				  	open={this.state.openRight}
				  	onOpenChange={this.rightOpenChange}
				  	children={child}
				  >					
				  </Drawer>
			</div>
		)
	}
}