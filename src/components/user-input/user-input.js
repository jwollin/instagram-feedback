import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
// import { getUserAuthentication } from "../app/app.selectors";
import { getUserData } from "./user-input.actions";
import {getUsername, getUserPassword } from "../app/app.selectors";

export const UserInput = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const loginUser = useSelector(state => getUsername(state));
    const loginPassword = useSelector(state => getUserPassword(state));
    // const authenticated = useSelector(state => getUserAuthentication(state));

    return (
        <>
            <label htmlFor="users">
                Enter an Instagram username
            </label>
            <input
                type="text"
                name="users"
                className="form-control"
                id="users"
                onChange={(evt) => setUsername(evt.target.value)}
            />
            <button
                className="btn btn-primary"
                onClick={() => getUserData({ username, loginUser,loginPassword, dispatch })}
            >
                Find a user
            </button>
        </>
    );
};