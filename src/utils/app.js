export default {
	spreadUser: function () {
		var user;
		try {
			user = JSON.parse(sessionStorage.spread_user);

		} catch (e) {
			console.warn(sessionStorage.spread_user, e);
			user = null;
		}
		return user;
	},


	checkEmail: function (email) {
		if ((/^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/.test(email))) {
			return true;
		} else {
			return false;
		}
	},

	spreadFormat: function (money, places, symbol, thousand, decimal) {
		if (typeof money === "string") {
			money = parseFloat(money);
			
		}
		money = money || 0;
		places = !isNaN(places = Math.abs(places)) ? places : 2;
		symbol = symbol !== undefined ? symbol : "" //"￥";
		thousand = thousand || ",";
		decimal = decimal || ".";
		var negative = money < 0 ? "-" : "",
			i = parseInt(money = Math.abs(+money || 0).toFixed(places), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		var out = symbol + negative + (j ? i.substr(0, j) + thousand : "");
		out += i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand);
		if (places) {
			out += decimal;
			out += Math.abs(money - i).toFixed(places + 1).slice(2).substr(0, places);
		}
		
		return out;

	},
	
	addStar: function(str, substr) {
		var length = str.length;
		if(length < 2) {
			return str;
		}
		if(length === 2) {
			substr = substr.substr(0, 1);
		}
		var starStr = '';
		for(var i = 0; i < substr.length; i++) {
			starStr += '*';
		}
		return str.replace(substr, starStr);
	},
	
	interceptStrAccordByte: function(str, len) {
		var regexp = /[^\x00-\xff]/g;
		if(str.replace(regexp, "aa").length <= len) {
			return str;
		}
		var m = Math.floor(len / 2);
		for(var i = m, j = str.length; i < j; i++) {
			// 当截取字符串字节长度满足指定的字节长度
			if(str.substring(0, i).replace(regexp, "aa").length >= len) {
				return str.substring(0, i);
			}
		}
		return str;
	},

}
