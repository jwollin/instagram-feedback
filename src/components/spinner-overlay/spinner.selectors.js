import { get } from 'lodash';
import { SPINNER } from "../../constants/constants";

export const getShowSpinner = (state) => get(state, `${SPINNER}`, false);
