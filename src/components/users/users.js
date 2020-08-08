import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthentication } from "../app/app.selectors";
import { updateObjectAction } from "@wecreatesoftware/redux-higher-order-reducers";
import { USERNAME } from "../../reducers/reducers";

export const Users = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector(state => getUserAuthentication(state));

    return authenticated ? (
        <>
            <label htmlFor="users">
                Enter an Instagram username
            </label>
            <input
                type="text"
                name="users"
                className="form-control"
                id="users"
                onChange={(evt) => dispatch(updateObjectAction({
                    reducerName: USERNAME,
                    payload: {
                        username: evt.target.value,
                    }
                }))}
            />
            <button
                className="btn btn-primary"
            >
                Find Users
            </button>
        </>
    ) : null;
};