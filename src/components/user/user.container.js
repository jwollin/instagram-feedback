import React from 'react';
import { useSelector } from "react-redux";
import { getUser } from "./user.selectors";
import { User } from "./user";
import { Header } from "../header/header";


export const UserContainer = () => {
    const { error, data } = useSelector(state => getUser(state));
    if (error) return <Header Element="h2" text={error} />;
    return data ? (
        <User {...data} />
    ) : null;
};
