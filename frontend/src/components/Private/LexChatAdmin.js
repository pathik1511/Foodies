import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import '../Private/chatbot.css';
import PubSub from 'pubsub-js'
import axios from 'axios';

class LexChatAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.moveToHumanChat = false;
        this.prevMessage = "";
        this.state = {
            data: '',
            lexUserId: 'chatbot-demo' + Date.now(),
            sessionAttributes: {}, visible: 'closed'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.getElementById("inputField").focus();
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:c1f80ea5-30bf-4f3a-98e1-f3971806a45f',
        });
        var lexruntime = new AWS.LexRuntime();
        this.lexruntime = lexruntime;
        setInterval(this.loadData, 3000);
    }

    handleClick() {
        this.setState({ visible: this.state.visible === 'open' ? 'closed' : 'open' });
        console.log(this.state);
    }

    pushChat(event) {
        event.preventDefault();

        var inputFieldText = document.getElementById('inputField');

        if (inputFieldText && inputFieldText.value && inputFieldText.value.trim().length > 0) {

            var inputField = inputFieldText.value.trim();
            inputFieldText.value = '...';
            inputFieldText.locked = true;

            var params = {
                botAlias: '$LATEST',
                botName: this.props.botName,
                inputText: inputField,
                userId: this.state.lexUserId,
                sessionAttributes: this.state.sessionAttributes
            };
            this.showRequest(inputField);

            
                const url = "https://pubsub-5omrz4kema-uc.a.run.app/publish"
                const data = new URLSearchParams();
                data.set('typeOfUser', 'admin');
                data.set('message', inputField);
                axios.post(url, data).then((res) => {
                    console.log(res.data);
                });

                inputFieldText.value = '';
                inputFieldText.locked = false;
        }
        return false;
    }

    showRequest(daText) {
        var conversationDiv = document.getElementById('conversation');
        var requestPara = document.createElement("P");
        requestPara.className = 'userRequest';
        requestPara.appendChild(document.createTextNode(daText));
        conversationDiv.appendChild(requestPara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    showError(daText) {
        var conversationDiv = document.getElementById('conversation');
        var errorPara = document.createElement("P");
        errorPara.className = 'lexError';
        errorPara.appendChild(document.createTextNode(daText));
        conversationDiv.appendChild(errorPara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    showHumanTurn(){
        var conversationDiv = document.getElementById('conversation');
        var errorPara = document.createElement("P");
        errorPara.className = 'humanTurn';
        errorPara.appendChild(document.createTextNode('This chat has been moved to restaurant representative'));
        conversationDiv.appendChild(errorPara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    showResponse(lexResponse) {

        var conversationDiv = document.getElementById('conversation');
        var responsePara = document.createElement("P");
        responsePara.className = 'lexResponse';
        if (lexResponse.message) {
            responsePara.appendChild(document.createTextNode(lexResponse.message));
            responsePara.appendChild(document.createElement('br'));
        }
        if (lexResponse.dialogState === 'ReadyForFulfillment') {
            responsePara.appendChild(document.createTextNode(
                'Ready for fulfillment'));
            // TODO:  show slot values
        } else {
            responsePara.appendChild(document.createTextNode(
                ''));
        }
        conversationDiv.appendChild(responsePara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    loadData() {
        try {
            const url = "https://pubsub-5omrz4kema-uc.a.run.app/listen"
            const data = new URLSearchParams();
            data.set('typeOfUser', 'admin');
            axios.post(url, data).then((res) => {
                console.log(res.data.message);
                if (this.prevMessage === res.data.message) {

                } else {
                    this.prevMessage = res.data.message;
                    if (res.data.message) {
                        //this.showResponse(res.data);
                        var conversationDiv = document.getElementById('conversation');
                        var responsePara = document.createElement("P");
                        responsePara.className = 'lexResponse';
                        if (res.data.message) {
                            responsePara.appendChild(document.createTextNode(res.data.message));
                            responsePara.appendChild(document.createElement('br'));
                        }
                        if (res.data.dialogState === 'ReadyForFulfillment') {
                            responsePara.appendChild(document.createTextNode(
                                'Ready for fulfillment'));
                            // TODO:  show slot values
                        } else {
                            responsePara.appendChild(document.createTextNode(
                                ''));
                        }
                        conversationDiv.appendChild(responsePara);
                        conversationDiv.scrollTop = conversationDiv.scrollHeight;
                    }
                }

                
            });
        } catch (e) {
            console.log(e);
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ data: event.target.value });
    }

    render() {

        const inputStyle = {
            padding: '4px',
            fontSize: 24,
            width: '388px',
            height: '40px',
            borderRadius: '1px',
            border: '10px'
        }

        const conversationStyle = {
            width: '400px',
            height: this.props.height,
            border: 'px solid #ccc',
            backgroundColor: this.props.backgroundColor,
            padding: '4px',
            overflow: 'scroll',
            borderBottom: 'thin ridge #bfbfbf'
        }

        const headerRectStyle = {
            backgroundColor: '#800080',
            width: '408px',
            height: '40px',
            textAlign: 'center',
            paddingTop: 12,
            paddingBottom: -12,
            color: '#FFFFFF',
            fontSize: '24px'
        }

        const chatcontainerStyle = {
            backgroundColor: '#FFFFFF',
            width: 408
        }

        const chatFormStyle = {
            margin: '1px',
            padding: '2px'
        }


        return (
            <div id="chatwrapper">
                <div id="chat-header-rect" style={headerRectStyle} onClick={this.handleClick} >{this.props.headerText}
                    {(this.state.visible === 'open') ? <span className='chevron bottom'></span> : <span className='chevron top'></span>}
                </div>
                <div id="chatcontainer" className={this.state.visible} style={chatcontainerStyle}>
                    <div id="conversation" style={conversationStyle} ></div>
                    <form id="chatform" style={chatFormStyle} onSubmit={this.pushChat.bind(this)}>
                        <input type="text"
                            id="inputField"
                            size="40"
                            value={this.state.data}
                            placeholder={this.props.placeholder}
                            onChange={this.handleChange.bind(this)}
                            style={inputStyle}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

LexChatAdmin.propTypes = {
    botName: PropTypes.string,
    IdentityPoolId: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
    headerText: PropTypes.string
}

export default LexChatAdmin;