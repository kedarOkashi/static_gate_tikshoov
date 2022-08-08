function minToMilSec(minutes){
	return minutes * 1000 * 60;
}
function isEmpty(str) {
    return (!str || str.length === 0 );
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function isValidDate(localTImeIsoString) {
	var offsetTime = minToMilSec(5);
	var serverTime = srvTime();//serverTime.js
	//console.log("server Time: "+  serverTime );
	var localTIme = new Date(localTImeIsoString);
	//console.log("Local Time: "+  localTIme );
	var diff =  Math.abs( serverTime.getTime() - localTIme.getTime() );
	//console.log("diff: "+  diff/minToMilSec(1) );
	if (diff < offsetTime)
		return true;
	return false;
}

function isValidToken(QueryString){
	if(QueryString.includes(atob("cmVkaXJlY3Q=")))
	{
		try{
			var param = QueryString.replace(atob('L3BvcnRhbC8/cmVkaXJlY3Q9'), '');
			var jsonObj = JSON.parse(atob(param));
			//console.log("QueryString: "+ QueryString);
			//console.log("param: "+ param);
			//console.log("jsonObj: "+ jsonObj);
			//console.log("jsonObj.date: "+ jsonObj.date);
			return isValidDate(jsonObj.date);
		}catch(err){
			return false;
		}
	}	
	return false;
}

var token = getParameterByName(atob("bmV4dA=="));
if (isEmpty(token)|| !(token.includes(atob("cmVkaXJlY3Q="))) ){
	window.location = "https://gate.tikshoov.co.il/landing/Tikshoovi/"; 
}else if(!isValidToken(token)){	
	window.location = "https://gate.tikshoov.co.il/landing/Tikshoovi/Timeout.html";
}



  



