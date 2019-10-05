
var redis = new Redis();

redis.subscribe("payment", function(err, count) {
  // `count` represents the number of channels we are currently subscribed to.
  console.log(count);
});

redis.on("message", function(channel, message) {
  const modules = include('modules');
  console.log("Receive message %s from channel %s", message, channel);
  message =  JSON.parse(message);
  let order = message.order;
  modules.transaction.initiatePayment(order); 
});