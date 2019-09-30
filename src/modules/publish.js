
var pub = new Redis();


exports.publish = function (channel, message){
	pub.publish(channel, message);
	
}


