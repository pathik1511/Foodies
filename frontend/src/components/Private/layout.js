import React, { Component, useState } from 'react';
import { Switch,Route } from 'react-router';
import AdminPrivateNavbar from './adminPrivateNavbar';
import Feedback from './Feedback';
import PrivateHome from './home';
import Home from './home';
import PrivateNavbar from './privateNavbar';
import UploadRecipe from './UploadRecipe';
import Visulation from './Visulation';
import Order from './order';
import ChatPage from './chatPage';
import WordCloud from './WordCloud';
import AdminChatPage from './adminChatPage';

const PrivateLayout = () => {

    const isadmin = (localStorage.getItem('isadmin')==="true") ? true : false;

    return ( 
        <div>
            <div>
            { isadmin ?(<AdminPrivateNavbar></AdminPrivateNavbar>):(<PrivateNavbar></PrivateNavbar>)}
            </div>
            <div>
                <div>
                    <Switch>
                        <Route exact path="/uploadRecipe" component={UploadRecipe}>
                            <UploadRecipe></UploadRecipe>
                        </Route>
                        <Route exact path="/giveFeedback" component={Feedback}>
                            <Feedback></Feedback>
                        </Route>
                        <Route exact path="/visualize" component={Visulation}>
                            <Visulation></Visulation>
                        </Route>
                        <Route exact path="/" component={PrivateHome}>
                            <PrivateHome></PrivateHome>
                        </Route>
                        <Route exact path="/order" component={Order}>
                            <Order></Order>
                        </Route>
                        <Route exact path="/wordCloud" component={WordCloud}>
                            <WordCloud></WordCloud>
                        </Route>
                        <Route exact path="/chatRoom" component={ChatPage}>
                            <ChatPage></ChatPage>
                        </Route>
                        <Route exact path="/adminChat" component={AdminChatPage}>
                            <AdminChatPage></AdminChatPage>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default PrivateLayout;