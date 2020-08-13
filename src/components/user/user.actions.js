import { call } from "../../fetch/call";
import { toggleBooleanAction, updateObjectAction } from "@wecreatesoftware/redux-higher-order-reducers";
import {SPINNER, USERS_DATA, USER_DATA} from "../../constants/constants";

export const getUserData = ({ username, loginUser, loginPassword, dispatch }) => {
    dispatch(toggleBooleanAction({ reducerName: SPINNER }));
    
    return call('/user-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            loginUser,
            loginPassword
        })
    })
    .then((data) => {
            console.log(
                '**********data**********\n',
                data,
                '\n**********data**********\n',
            )
            return [
                dispatch(updateObjectAction({
                    reducerName: USER_DATA,
                    payload: data
                })),
                dispatch(toggleBooleanAction({
                    reducerName: SPINNER
                }))
            ]
        }
    );
};

export const getUsersData = ({ username, loginUser, loginPassword, dispatch }) => {
    dispatch(toggleBooleanAction({ reducerName: SPINNER }));

    return call('/users-data', {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            loginUser,
            loginPassword
        })
    })
    .then((data) => {
            return [
                dispatch(updateObjectAction({
                    reducerName: USERS_DATA,
                    payload: data
                })),
                dispatch(toggleBooleanAction({
                    reducerName: SPINNER
                }))
            ]
        });
};