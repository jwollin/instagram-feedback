import React from 'react';
import { useSelector } from "react-redux";
import { getUsersName } from "../app/app.selectors";

export const Header = () => {
    const username = useSelector(state => getUsersName(state));
    const header = <h1>Instagram schtuff</h1>;
    return username ? (
        <>
            {header}
            <h2>{username}</h2>
        </>
    ) : header;
};