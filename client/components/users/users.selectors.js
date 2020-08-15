import { get } from "lodash";
import { USERS_DATA } from "../../constants/constants";

export const getUsers = (state) => {
    console.log(
        '**********state users**********\n',
        state,
        '\n**********state users**********\n',
    )
    return get(state, `${USERS_DATA}`, []);
};