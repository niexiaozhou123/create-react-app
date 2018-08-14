import React,{Component } from 'react';
import {Toast } from 'antd-mobile';



export default class NotFound extends Component{
	constructor(props){
		super(props);		
		this.state={
			
		};
	}
	
	componentDidMount(){
		Toast.fail('404--NouFound..',3,null,true);
	}
	
	render(){
		
		return(
			<div>
				<h1> <strong> 404!!访问的页面走丢啦!!</strong></h1>
			</div>
		)
	}
}