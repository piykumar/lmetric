var http = require("http");

http.createServer(function(request, response) {
  var fs = require('fs');
  var url = require('url');
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  var urltmp = (request.url).toString();
  // console.log(request.url.toString());
  //response.write(query);

  if (request.url != '/favicon.ico') {
  // send your request

  function geturlparam( name ) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( urltmp );
	if( results == null )
		return "";
	else
		return results[1];
	}
  
  function base64_decode (data) {

  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec;
}
  
  var msg_param = geturlparam( 'msg' );
  var msg_decode=base64_decode(msg_param);
  var logs=console.log(msg_decode);
  fs.appendFile("/opt/nodejspiy/logs/decodelogfile", msg_decode+"\n", function(err) {
    if(err) {
        console.log(err);
    } else {
        //console.log("file saved!");
    }
}); 


  var img = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=');
  response.writeHead(200, {'Content-Type': 'image/png' });
  response.end(img, 'binary');
}
}).listen(7777);
