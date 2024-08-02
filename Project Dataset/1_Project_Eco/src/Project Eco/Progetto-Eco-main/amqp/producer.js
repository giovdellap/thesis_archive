var amqp = require('amqplib/callback_api');
const config=require('config')


function sendByAmqp(data){

    let amqp_server = ""

    if(config.get("docker_deploy") == "yes"){
        amqp_server = config.get("amqp_server_docker")
    }

    else{
        amqp_server = config.get("amqp_server")
    }

    // console.log("amqp_server: "+amqp_server)

amqp.connect(amqp_server, function(error0, connection) {
    if (error0) {
        console.log(error0)
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = config.get('amqp_queue');
        var msg = data

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

       // console.log(" [x] Sent %s", msg);
       console.log("INVIATO \n ")
    });
    setTimeout(function() {
        connection.close();
    }, 500);
});
}


exports.sendByAmqp=sendByAmqp