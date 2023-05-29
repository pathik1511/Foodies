const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub('csci-5408-a1');
const topicAdmin = 'projects/csci-5408-a1/topics/foodAdmin';
const subscriptionAdmin = 'projects/csci-5408-a1/subscriptions/foodAdmin-sub';
const topicUser = 'projects/csci-5408-a1/topics/foodUser';
const subscriptionUser = 'projects/csci-5408-a1/subscriptions/foodUser-sub';
let messageAdmin = '';
let messageUser = '';

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome",
    });
});

app.post('/listen', (req, res) => {

    try {
        
        let typeOfUser = req.body.typeOfUser;
        console.log(`listen of ${typeOfUser}`);
        if(typeOfUser === 'admin'){
            return res.status(200).json({
                success: true,
                message: messageAdmin,
                from: "admin",
                dialogState:''
            })
        }else{
            return res.status(200).json({
                success: true,
                message: messageUser,
                from: "user",
                dialogState:''
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            success: true,
            message: "internal server error"
        })
    }
});


app.post('/publish', (req, res) => {

    try {
        
        let msg = req.body.message;
        let typeOfUser = req.body.typeOfUser;

        console.log(msg);
        console.log(typeOfUser);
        if(typeOfUser === 'admin'){
            console.log('admin');
            listenForMessagesUser();
            publishMessageAdmin(msg);
        }else{
            console.log('user');
            listenForMessagesAdmin();
            publishMessageUser(msg);
        }

        return res.status(200).json({
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({
            success: true,
            message: "internal server error"
        })
    }
});


function listenForMessagesAdmin() {
    const subscription = pubSubClient.subscription(subscriptionUser);

    let messageCount = 0;
    const messageHandler = message => {
        console.log(`Received message admin ${message.id}:`);
        console.log(`\tData admin: ${message.data}`);
        messageAdmin = message.data.toString();
        console.log(`\tAttributes: ${message.attributes}`);
        messageCount += 1;

        message.ack();
    };

    subscription.on('message', messageHandler);

    setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount} message(s) received.`);
    }, 60 * 1000);
}

function listenForMessagesUser() {
    const subscription = pubSubClient.subscription(subscriptionAdmin);

    let messageCount = 0;
    const messageHandler = message => {
        console.log(`Received message user ${message.id}:`);
        console.log(`\tData user: ${message.data}`);
        messageUser = message.data.toString();
        console.log(`\tAttributes: ${message.attributes}`);
        messageCount += 1;

        message.ack();
    };

    subscription.on('message', messageHandler);

    setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount} message(s) received.`);
    }, 60 * 1000);
}

async function publishMessageAdmin(data) {
    const dataBuffer = Buffer.from(data);

    try {
        const messageId = await pubSubClient.topic(topicAdmin).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}

async function publishMessageUser(data) {
    const dataBuffer = Buffer.from(data);

    try {
        const messageId = await pubSubClient.topic(topicUser).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}

app.use((req, res, next) => {
    return res.status(404).json({
        success: true,
        message: "Please check the url!"
    });
});
module.exports = app;