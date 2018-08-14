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
	
	
	
	
	
}