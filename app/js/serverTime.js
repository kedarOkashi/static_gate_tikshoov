var offset = 0;
function calcOffset() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", window.location.origin, false);
    xmlhttp.send();
    var dateStr = xmlhttp.getResponseHeader('Date');
	//console.log("server offset: "+ new Date(Date.parse(dateStr)) );
    var serverTimeMillisGMT = Date.parse(new Date(Date.parse(dateStr)).toUTCString());
    var localMillisUTC = Date.parse(new Date().toUTCString());
    offset = serverTimeMillisGMT -  localMillisUTC;
}

function getServerTime() {
    var date = new Date();
	calcOffset();
    date.setTime(date.getTime() + offset);
    return date;
}

function srvTime(){
    try {
        //FF, Opera, Safari, Chrome
        xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
        //IE
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (eerr3) {
                //AJAX not supported, use CPU time.
                alert("AJAX not supported");
            }
        }
    }
    xmlHttp.open('HEAD',window.location.href.toString(),false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    var date = xmlHttp.getResponseHeader("Date");
	return new Date(date);
}
//console.log('Server Time: ', srvTime());
//console.log('Locale Time: ', new Date(srvTime()));