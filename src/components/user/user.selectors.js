import { get } from "lodash";
import { USER_DATA } from "../../constants/constants";

export const getUser = (state) => {
    return get(state, `${USER_DATA}`, false);
};