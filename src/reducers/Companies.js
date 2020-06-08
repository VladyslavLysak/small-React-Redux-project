import * as R from 'ramda';

import {
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANY_BY_ID_SUCCESS
} from '../actions/ActionTypes';

const intialState = {

};

export default (state = intialState, { type, payload }) => {
    switch (type) {
        case FETCH_COMPANIES_SUCCESS:
            const newValues = R.indexBy(R.prop('id'), payload);
            return R.merge(state, newValues);
        case FETCH_COMPANY_BY_ID_SUCCESS:
            return R.assoc(payload.id, payload, state);
        default:
            return state;
    }
};