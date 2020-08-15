import React from 'react';
import { Header } from "../header/header";
import { Login } from "../login/login";
// import { UserInput } from "../user-input/user-input";
import { SpinnerOverlay } from "../spinner-overlay/spinner-overlay";
import { Users } from "../users/users";
import { UserContainer } from "../user/user.container";

export const App = () => (
    <div className="container-fluid react-instagram-app">
        <Login />
        <div className="row">
            <div className="col-sm-12">
                <Header Element="h1" text="Instagram stuff"/>
            </div>
        </div>
        <UserContainer />
        <Users />
        <SpinnerOverlay />
    </div>
);