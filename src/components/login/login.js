import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateObjectAction } from "@wecreatesoftware/redux-higher-order-reducers";
import { getUserAuthentication, getUserPassword, getUsername } from "../app/app.selectors";
import { USER_PROFILE_DATA } from "../../reducers/reducers";
import { login } from "./login.actions";

export const Login = () => {
    const dispatch = useDispatch();
    const username = useSelector(state => getUsername(state));
    const password = useSelector(state => getUserPassword(state));
    const authenticated = useSelector(state => getUserAuthentication(state));

    return !authenticated ? (
        <>
            <label
                htmlFor="username"
                className={`${password ? 'label-up' : ''}`}
            >
                Your Username
            </label>
            <input
                type="text"
                name="username"
                className="form-control"
                id="username"
                value={username}
                onChange={(evt) => dispatch(updateObjectAction({
                    reducerName: USER_PROFILE_DATA,
                    payload: {
                        username: evt.target.value,
                    }
                }))}
            />
            <label
                htmlFor="password"
                className={`${password ? 'label-up' : ''}`}
            >
                Your Password
            </label>
            <input
                type="text"
                name="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(evt) => dispatch(updateObjectAction({
                    reducerName: USER_PROFILE_DATA,
                    payload: {
                        password: evt.target.value,
                    }
                }))}
            />
            <button
                className="btn btn-primary"
                onClick={() => login({
                    username: 'jessewollin',
                    password: 'Ingres#1865',
                    dispatch
                })}
            >
                Submit
            </button>
        </>
    ) : null;
};