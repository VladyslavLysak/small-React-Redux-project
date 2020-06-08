import * as R from 'ramda';

import {
    FETCH_COMPANIES_SUCCESS,
    SEARCH_PRODUCT
} from '../actions/ActionTypes';

const initialState = {
    ids: [],
    search: ''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_COMPANIES_SUCCESS:
            return R.merge(state, {
                ids: R.pluck('id', payload)
            });
        case SEARCH_PRODUCT:
            return R.merge(state, {
                search: payload
            });
        default:
            return state;
    }
};