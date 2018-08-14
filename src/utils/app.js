export default {
	spreadUser:function(){
		var user;
		try{
			user = JSON.parse(sessionStorage.spread_user);
			
		}catch(e){
			console.warn(sessionStorage.spread_user, e);
			user = null;
		}
		return user;
	},
	
	
	checkEmail:function(email){
		if((/^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/.test(email))){
			return true;
		}else{
			return false;
		}
	}
	
	
	
	
	
}