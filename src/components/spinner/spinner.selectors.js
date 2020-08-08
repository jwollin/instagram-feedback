import { get } from 'lodash';
import { SPINNER } from "../../reducers/reducers";

export const getShowSpinner = (state) => get(state, `${SPINNER}`, false);

