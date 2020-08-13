import { call } from "../../fetch/call";
import { addItemsAction, toggleBooleanAction } from "@wecreatesoftware/redux-higher-order-reducers";
import {SPINNER, USERS_DATA} from "../../constants/constants";

export const getUsersData = ({username, loginPassword, loginUsername, dispatch}) => {
    dispatch(toggleBooleanAction({ reducerName: SPINNER }));
    
    return call('/users-data', { method: 'POST', username })
        .then((data) => {
            console.log(
                '**********data**********\n',
                data,
                '\n**********data**********\n',
            )
            return [
                dispatch(addItemsAction({
                    reducerName: USERS_DATA,
                    payload: data
                })),
                dispatch(toggleBooleanAction({
                    reducerName: SPINNER
                }))
            ]
        }
    );
};