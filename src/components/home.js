import React, { Component } from 'react';

import { Drawer, List, NavBar, Icon, Button,Switch,Toast,Flex,Modal} from 'antd-mobile';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import  axios  from '../utils/request.js';
import styles from '../style/home.css';
import app from '../utils/app.js';
import Menus from '../utils/menus';
import navbarImg from '../imgs/icon_login_user.png';
import titleIcon from '../imgs/icon-title.png';
import helpIcon from '../imgs/icon_help.png';


const Item = List.Item;
const user = app.spreadUser();

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

export default class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			openLeft:false,
			openRight:false,
			swi:true,
			userInfo:{},
			extend:{},
			topwd: '********************',
			modalExtend:false,
			imgsrc:'',
			
			
			//流水
				flow: 0,
				flowToday: 0,
				nflow: null,
				nflowToday: null,
				pflow: 0,
				pflowToday: 0,
				taxIncome: 0,
				taxIncomeToday: 0,
				//加密流水
				flow2: '',
				flowToday2: '',
				nflow2: '',
				nflowToday2: '',
				pflow2: '',
				pflowToday2: '',
				taxIncome2: '',
				taxIncomeToday2: '',
		};
		
		this.leftOpenChange = this.leftOpenChange.bind(this);
		this.rightOpenChange = this.rightOpenChange.bind(this);
		this.switchChange = this.switchChange.bind(this);
		this.lookExtend = this.lookExtend.bind(this);
		// this.goPath = this.goPath.bind(this);
	}
	
	componentDidMount(){   // react 生命周期  挂载
		this.load();
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	
	//touch 顶部
	backTop(){
		document.documentElement.scrollTop=0;
	}
	leftOpenChange(e){
		
		this.setState({
			openLeft:!this.state.openLeft,
			openRight:false
		});
	}
	rightOpenChange(e){
		
		this.setState({
			openRight:!this.state.openRight,
			openLeft:false
		});
	}
	switchChange(e){
		
		this.setState({
			swi:e
		})
	}
	goPath(item){
		if(item){
			if(item.path==='/'){
				this.props.history.replace(item.path)
				return;
			}
			this.props.history.push(item.path);
		}
		// console.log(item)
	}
	goPath2(url){
		this.props.history.push(url);
	}
	
	onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  
  lookExtend(){
		this.setState({
			modalExtend:!this.state.modalExtend
		});
		var url ='http://qr.liantu.com/api.php?bg=ffffff&amp;fg=000000&amp;el=l&amp;w=300&amp;m=4&amp;text='+encodeURIComponent(this.state.extend.jumpUrl); 
		this.setState({
			imgsrc:url
		});
		
  }
	
	load(){
		Toast.loading('正在加载数据..',1.5,null,true)
		axios.post('api/main/index',{
			token:user.token
		})
		.then((res)=>{
			// console.log(res)
			if(res.status===0&&res.data){
				res.data.myTaxIncome.flow=app.spreadFormat(res.data.myTaxIncome.flow);
				res.data.myTaxIncome.flowToday=app.spreadFormat(res.data.myTaxIncome.flowToday);
				res.data.myTaxIncome.nflow=app.spreadFormat(res.data.myTaxIncome.nflow);
				res.data.myTaxIncome.nflowToday=app.spreadFormat(res.data.myTaxIncome.nflowToday);
				res.data.myTaxIncome.pflow=app.spreadFormat(res.data.myTaxIncome.pflow);
				res.data.myTaxIncome.pflowToday=app.spreadFormat(res.data.myTaxIncome.pflowToday);
				res.data.myTaxIncome.taxIncome=app.spreadFormat(res.data.myTaxIncome.taxIncome);
				res.data.myTaxIncome.taxIncomeToday=app.spreadFormat(res.data.myTaxIncome.taxIncomeToday);
				
				//setState 方法内只接受对象更改一次
				this.setState({
					userInfo:res.data,
					flow:res.data.myTaxIncome.flow,
					flowToday:res.data.myTaxIncome.flowToday,
					nflow:res.data.myTaxIncome.nflow,
					nflowToday:res.data.myTaxIncome.nflowToday,
					pflow:res.data.myTaxIncome.pflow,
					pflowToday:res.data.myTaxIncome.pflowToday,
					taxIncome:res.data.myTaxIncome.taxIncome,
					taxIncomeToday:res.data.myTaxIncome.taxIncomeToday,
					extend: res.data.userTemplate
				})
				
			}else{
				Toast.fail(res.msg,2,null,true)
			}
		})
		.catch(function(err){
			console.error(err);
		})
	}
	
	render(){
		
		
		const sidebar = (<List style={{width:'250px',overflowY:'auto',background:'#ffffff',}}>
				<List.Item style={{background:'rgb(255,255,255)',}}>
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
				<List.Item style={{background:'rgb(255,255,255)',}}>
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
			
		
		
		
		
		
		return(
			<div>
				<NavBar mode='light'
					leftContent={[
					<Icon type="ellipsis" style={{zIndex:'1'}}/>,
					<label style={{zIndex:'1'}} >菜单</label>
					]}
					onLeftClick={this.leftOpenChange}
					rightContent={[						
						<img src={navbarImg} style={{width:'18px',height:'18px',background:'#ffffff',zIndex:'1'}} onClick={this.rightOpenChange} alt=''/>,
						<label style={{zIndex:'1'}} onClick={this.rightOpenChange}>info</label>						
					]}
					style={{position:'fixed',top:'0',left:'0',right:'0',zIndex:'1'}}
					onClick={this.backTop}
				>HOME</NavBar>
				
				
				<Drawer
					className="my-drawer"
					style={{ maxHeight: document.body.clientHeight,marginBottom:'0',height:document.body.offsetHeight}}
					enableDragHandle
					contentStyle={{   textAlign: 'center', paddingTop: 42,height:document.body.offsetHeight }}					
					contentStyle={{height:document.body.offsetHeight}}
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
					
					
					<div className={styles['content']}>
						<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
							<Item extra={<Icon type='right' onClick={()=>this.props.history.push('/user_info')} />}>
								<img src={navbarImg} style={{width:'15px',height:'15px',paddingRight:'8px'}} alt=''/>
								<label style={{fontSize:'14px',color:'#BBBBBB'}}>{user.nickName}</label>
							</Item>
						</List>
						
						<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
							<Item extra={<Icon type='right' onClick={()=>this.props.history.push('')} />}>
								<img src={titleIcon} style={{width:'5px',height:'15px',paddingRight:'8px'}} alt=''/>
								<label style={{fontSize:'15px',}}>收益信息
									<Switch checked={this.state.swi} color='rgb(0,0,0)'  onChange={this.switchChange}  platform='android' />
								</label>
							</Item>
							<Item extra={this.state.swi?this.state.flow:'****'}>
								<label style={{fontSize:'13px',}}>团队总流水</label><img src={helpIcon} alt='' style={{width:'18px',height:'18px',paddingLeft:'8px'}}/>
							</Item>
							<Item extra={
								<label style={{fontSize:'13px',color:'rgb(0,0,0)'}}>
									<p style={{margin:'0'}}>团队负流水
										<img src={helpIcon} alt='' style={{width:'18px',height:'18px',paddingLeft:'8px'}}/>
									</p>
									<p style={{margin:'0'}}>{this.state.swi?this.state.nflow:'****'}</p>
								</label>	
							}>
								<label style={{fontSize:'13px',}}>
									<p style={{margin:'0'}}>团队正流水
										<img src={helpIcon} alt='' style={{width:'18px',height:'18px',paddingLeft:'8px'}}/>
									</p>
									<p style={{margin:'0'}}>{this.state.swi?this.state.pflow:'****'}</p>
								</label>								
							</Item>
							<Item extra={this.state.swi?this.state.flowToday:'****'}>
								<label style={{fontSize:'13px',}}>今日团队总流水</label><img src={helpIcon} alt='' style={{width:'18px',height:'18px',paddingLeft:'8px'}}/>
							</Item>
							<Item extra={
								<label style={{fontSize:'13px',color:'rgb(0,0,0)'}}>
									<p style={{margin:'0'}}>今日团队负流水
										<img src={helpIcon} alt='' style={{width:'18px',height:'18px',paddingLeft:'8px'}}/>
									</p>
									<p style={{margin:'0'}}>{this.state.swi?this.state.nflowToday:'****'}</p>
								</label>	
							}>
								<label style={{fontSize:'13px',}}>
									<p style={{margin:'0'}}>今日团队正流水
										<img src={helpIcon} alt='' style={{width:'18px',height:'18px',paddingLeft:'8px'}}/>
									</p>
									<p style={{margin:'0'}}>{this.state.swi?this.state.pflowToday:'****'}</p>
								</label>								
							</Item>
							<Item extra={this.state.swi?this.state.taxIncomeToday:'****'}>
								<label style={{fontSize:'13px',}}>今日个人税收收益</label><img src={helpIcon} alt='' style={{width:'18px',height:'18px',paddingLeft:'8px'}}/>
							</Item>
							<Item>
								<label style={{fontSize:'13px',}}>
									提现额度:<span style={{color:'red'}}>{this.state.swi?this.state.taxIncome:'********'}</span>
									<Button size='small' style={{width:'90px',display:'inline',marginLeft:'10px'}} type='primary'>银行卡提现</Button>
									<Button size='small' style={{width:'80px',display:'inline'}} type='primary' onClick={()=>this.goPath2('/manage_alipay_transfer')}>支付宝提现</Button>
								</label>
							</Item>
						</List>
						
						<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
							<Item>
								<img src={titleIcon} style={{width:'5px',height:'15px',paddingRight:'8px'}} alt=''/>
								<label style={{fontSize:'15px',}}>我的代理</label>
							</Item>							
							<Item>							
								<Flex style={{fontSize:'13px',}}>
									<Flex.Item>
										<div style={{width:'120px',textAlign:'center'}}>
											<p  style={{margin:'0',color:'rgb(28,162,97)'}}>总计</p>
											<p  style={{margin:'0'}}>{this.state.userInfo.grouptotal}</p>
										</div>
									</Flex.Item>
									<Flex.Item>
										<div style={{width:'120px',textAlign:'center'}}>
											<p  style={{margin:'0',}}>今日新增</p>
											<p  style={{margin:'0'}}>{this.state.userInfo.groupnumtoday}</p>
										</div>
									</Flex.Item>
									<Flex.Item>
										<div style={{width:'120px',textAlign:'center'}}>
											<p  style={{margin:'0',}}>昨日新增</p>
											<p  style={{margin:'0'}}>{this.state.userInfo.groupnumyesterday}</p>
										</div>
									</Flex.Item>
								</Flex>
							</Item>
							<Item>							
									<Flex style={{fontSize:'13px',}}>
										<Flex.Item>
											<div style={{width:'120px',textAlign:'center'}}>
												<p  style={{margin:'0',color:'rgb(28,162,97)'}}>直属</p>
												<p  style={{margin:'0'}}>{this.state.userInfo.undernum}</p>
											</div>
										</Flex.Item>
										<Flex.Item>
											<div style={{width:'120px',textAlign:'center'}}>
												<p  style={{margin:'0',}}>今日新增</p>
												<p  style={{margin:'0'}}>{this.state.userInfo.undernumtoday}</p>
											</div>
										</Flex.Item>
										<Flex.Item>
											<div style={{width:'120px',textAlign:'center'}}>
												<p  style={{margin:'0',}}>昨日新增</p>
												<p  style={{margin:'0'}}>{this.state.userInfo.groupnumyesterday}</p>
											</div>
										</Flex.Item>
									</Flex>	
							</Item>
						</List>
						
						<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
							<Item>
								<img src={titleIcon} style={{width:'5px',height:'15px',paddingRight:'8px'}} alt=''/>
								<label style={{fontSize:'15px',}}>我的玩家</label>
							</Item>							
							<Item>							
								<Flex style={{fontSize:'13px',}}>
									<Flex.Item>
										<div style={{width:'120px',textAlign:'center'}}>
											<p  style={{margin:'0',color:'rgb(28,162,97)'}}>总计</p>
											<p  style={{margin:'0'}}>{this.state.userInfo.tuanUserNum}</p>
										</div>
									</Flex.Item>
									<Flex.Item>
										<div style={{width:'120px',textAlign:'center'}}>
											<p  style={{margin:'0',}}>今日新增</p>
											<p  style={{margin:'0'}}>{this.state.userInfo.today_tuandui_registers}</p>
										</div>
									</Flex.Item>
									<Flex.Item>
										<div style={{width:'120px',textAlign:'center'}}>
											<p  style={{margin:'0',}}>昨日新增</p>
											<p  style={{margin:'0'}}>{this.state.userInfo.yesterday_tuandui_registers}</p>
										</div>
									</Flex.Item>
								</Flex>
							</Item>
							<Item>							
									<Flex style={{fontSize:'13px',}}>
										<Flex.Item>
											<div style={{width:'120px',textAlign:'center'}}>
												<p  style={{margin:'0',color:'rgb(28,162,97)'}}>直属</p>
												<p  style={{margin:'0'}}>{this.state.userInfo.underUserNum}</p>
											</div>
										</Flex.Item>
										<Flex.Item>
											<div style={{width:'120px',textAlign:'center'}}>
												<p  style={{margin:'0',}}>今日新增</p>
												<p  style={{margin:'0'}}>{this.state.userInfo.today_registers}</p>
											</div>
										</Flex.Item>
										<Flex.Item>
											<div style={{width:'120px',textAlign:'center'}}>
												<p  style={{margin:'0',}}>昨日新增</p>
												<p  style={{margin:'0'}}>{this.state.userInfo.yesterday_registers}</p>
											</div>
										</Flex.Item>
									</Flex>	
							</Item>
						</List>
						
						<List style={{margin:'10px 0 10px 10px',width:'95%',boxShadow:'0 2px 10px #888888'}}>
							<Item extra={<Icon type='right' />}>
								<img src={titleIcon} style={{width:'5px',height:'15px',paddingRight:'8px'}} alt=''/>
								<label style={{fontSize:'15px',}}>推广链接</label>
							</Item>							
							<Item>
								<label style={{fontSize:'13px',}}>{this.state.extend.jumpUrl}</label>
							</Item>
							<Item>
								<Flex>
									<Flex.Item>
										<CopyToClipboard text={this.state.extend.jumpUrl} onCopy={(text,res)=>res?Toast.success('复制成功!',2,null,true):Toast.offline('复制失败,请重试.',2,null,false)}>
											<Button style={{display:'inline'}} type='primary' size='small'>复制链接</Button>
										</CopyToClipboard>
									</Flex.Item>
									<Flex.Item>
										<Button style={{display:'inline'}} type='primary' size='small' onClick={this.lookExtend}>查看二维码</Button>
									</Flex.Item>
									<Flex.Item>
										<Button style={{display:'inline'}} type='primary' size='small' onClick={()=>window.open(this.state.extend.jumpUrl)}>预览链接</Button>
									</Flex.Item>
								</Flex>
							</Item>
						</List>
						
						
						 <Modal
							  visible={this.state.modalExtend}
							  transparent
							  maskClosable
							  onClose={this.lookExtend}
							  popup
							  title="二维码详情"
							  style={{margin:'220px 5%',width:'90%',height:'300px'}}
							  wrapProps={{ onTouchStart: this.onWrapTouchStart }}
							>
							  <div style={{ }}>
								<img src={this.state.imgsrc} style={{height: 250, width:250,}}/>
							  </div>
						</Modal>
						
					</div>
			</div>
		)
	}
}