import reportTeam from '../imgs/icon-report-team.png';
import reportDate from '../imgs/icon-report-date.png';
import reportGame from '../imgs/icon-report-game.png';
import reportPlayer from '../imgs/icon-report-player.png';
import subReg from '../imgs/icon-sub-reg.png';
import payRecord from '../imgs/icon-pay-record.png';
import subTransfer from '../imgs/icon-sub-transfer.png';
import exetend from '../imgs/icon-extend.png';
import manageSpread from '../imgs/icon-manage-spread.png';
import manageTransfer from '../imgs/icon-manage-transfer.png';
import userInfo from '../imgs/icon-user-info.png';
import userMail from '../imgs/icon-user-mail.png';
import userPassword from '../imgs/icon-user-password.png';
import userResult from '../imgs/icon-user-result.png';
import manageCard from '../imgs/icon-manage-card.png';


var Menus =[
	
];

Menus.left = [
	{
		name:'团队列表',
		path:'000',
		img:reportTeam
	},
	{
		name:'日度报表',
		path:'000',
		img:reportDate
	},
	{
		name:'游戏报表',
		path:'000',
		img:reportGame
	},
	{
		name:'玩家报表',
		path:'000',
		img:reportPlayer
	},
	{
		name:'注册下级',
		path:'000',
		img:subReg
	},
	{
		name:'提转记录',
		path:'000',
		img:payRecord
	},
	{
		name:'下级转账',
		path:'000',
		img:subTransfer
	},
	{
		name:'玩家充值',
		path:'000',
		img:subTransfer
	},
	{
		name:'二维码推广链接',
		path:'000',
		img:exetend
	},
	{
		name:'前置注册链接',
		path:'000',
		img:exetend
	},
	{
		name:'代理注册链接',
		path:'000',
		img:exetend
	},
	{
		name:'玩家转代理',
		path:'000',
		img:exetend
	},
	{
		name:'代理管理',
		path:'000',
		img:manageSpread
	},
	{
		name:'提现管理',
		path:'000',
		img:manageTransfer
	},
	{
		name:'支付宝提现',
		path:'000',
		img:manageTransfer
	},
	
];

Menus.right = [
	{
		name:'个人信息',
		path:'/user_info',
		img:userInfo
	},
	{
		name:'邮箱绑定',
		path:'/user_mail',
		img:userMail
	},
	{
		name:'登录密码',
		path:'/user_pwd',
		img:userPassword
	},
	{
		name:'结算密码',
		path:'/user_result',
		img:userResult
	},
	{
		name:'支付宝绑定',
		path:'/manage_bound_alipay',
		img:manageCard
	},
	{
		name:'银行卡管理',
		path:'000',
		img:manageCard
	},
	{
		name:'页面刷新',
		path:'/refresh',
		img:manageCard
	},
	{
		name:'安全退出',
		path:'/',
		img:manageCard
	},
];


export default Menus;