import { call } from "../../fetch/call";
import { toggleBooleanAction, updateObjectAction } from "@wecreatesoftware/redux-higher-order-reducers";
import { SPINNER, USER_PROFILE_DATA } from "../../reducers/reducers";

export const login = ({username, password, dispatch}) => {
    dispatch(toggleBooleanAction({
        reducerName: SPINNER,
    }));

    return call('/login', { method: 'POST', username, password })
        .then(({
           authenticated,
           username,
           name
        }) => [
            dispatch(updateObjectAction({
                reducerName: USER_PROFILE_DATA,
                payload: {
                    authenticated,
                    name,
                    username,
                }
            })),
            dispatch(toggleBooleanAction({
                reducerName: SPINNER,
            }))
        ]
    );
};