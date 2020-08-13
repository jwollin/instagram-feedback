import { call } from "../../fetch/call";
import {toggleBooleanAction, updateObjectAction} from "@wecreatesoftware/redux-higher-order-reducers";
import {SPINNER, USER_DATA} from "../../constants/constants";

export const getUserData = ({username, loginPassword, loginUsername, dispatch}) => {
    dispatch(toggleBooleanAction({ reducerName: SPINNER }));
    return call('/user-data', { method: 'POST', username, loginPassword, loginUsername })
        .then((data) => {
            return [
                dispatch(updateObjectAction({
                    reducerName: USER_DATA,
                    payload: data
                })),
                dispatch(toggleBooleanAction({
                    reducerName: SPINNER
                }))
            ]
        }).catch((error) => {});
};