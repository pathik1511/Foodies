import React, { Component, useState } from 'react';
import LexChatAdmin from './LexChatAdmin';

function AdminChatPage(props) {

    return (
        <div>
            <LexChatAdmin
                botName="FoodOderHelper"
                IdentityPoolId="us-east-1:c1f80ea5-30bf-4f3a-98e1-f3971806a45f"
                placeholder="Type here..."
                backgroundColor="#FFFFFF"
                height="530px"
                region="us-east-1"
                headerText="Chat with customer"
                headerStyle={{ backgroundColor: "#800080", fontSize: "30px" }}
                greeting={
                    "Hello, how can I help? You can say things like 'help' to get more info"
                }
            />
        </div>
    );
}
export default AdminChatPage;