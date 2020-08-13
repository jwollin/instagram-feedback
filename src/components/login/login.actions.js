import { call } from "../../fetch/call";
import { updateObjectAction } from "@wecreatesoftware/redux-higher-order-reducers";
import {PROFILE, USER_AUTHENTICATION, USER_DATA, USERS_DATA} from "../../constants/constants";

export const login = ({ username, password, dispatch }) => {
    return call('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((data) => {
        if (data[USER_AUTHENTICATION].authenticated) {
            console.log(
                '**********data**********\n',
                data,
                '\n**********data**********\n',
            )
            return [
                dispatch(updateObjectAction({
                    reducerName: USER_AUTHENTICATION,
                    payload: {
                        username,
                        password,
                        authenticated: data[USER_AUTHENTICATION].authenticated
                    },
                })),
                dispatch(updateObjectAction({
                    reducerName: USER_DATA,
                    payload: {
                        error: null,
                        data: data[USER_DATA].data
                    },
                })),
                dispatch(updateObjectAction({
                    reducerName: USERS_DATA,
                    payload: {
                        error: null,
                        data: data[USERS_DATA].data
                    },
                }))
            ];
        }
    });
};