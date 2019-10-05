
const ORDER_STATUS_CHANNEL_NAME = "orderstatus";
var max =2;

module.exports =  {
	initiatePayment(order){
		const modules = include('modules');
		let mockedValue = Math.floor(Math.random() * Math.floor(max));
		let status;
		if(mockedValue === 0) status = 0; //Failure
		else status = 1; //Success
		order.status = status;
		let orderStatusObj = {
			order:order
		};
		modules.publisher.publish(ORDER_STATUS_CHANNEL_NAME,JSON.stringify(orderStatusObj));
	}
}
