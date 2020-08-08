import { get } from 'lodash';
import { USER_PROFILE_DATA } from "../../reducers/reducers";

export const getUsersName = (state) => get(state, `${USER_PROFILE_DATA}.name`, '');
