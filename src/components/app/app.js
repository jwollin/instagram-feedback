import React from 'react';
import { Header } from "../header/header";
import { Login } from "../login/login";
import { Users } from "../users/users";
import { Spinner } from "../spinner/spinner";

export const App = () => {
    return (
        <div className="container">
            <Header />
            <Login />
            <Users />
            <Spinner />
        </div>
    );
};