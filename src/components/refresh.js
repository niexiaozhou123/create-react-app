import React,{Component } from 'react';

export default class Refresh extends Component{
	constructor(props){
		super(props);
		// console.log(props)
		this.state={
			router:null
		};
		//con 构造内调用页面方法 传入props属性   
		this.load(props);
	}
	componentDidMount(){   // react 生命周期  挂载
		// this.load();
 		
	}
	componentWillUnmount(){  // react 生命周期  卸载
		
	}
	
	load(e){
		setTimeout(function() {				
			e.history.goBack();
		}, 500);
	}
		
	
	render(){
		
		return(
			<div>Refresh</div>
		)
	}
}

