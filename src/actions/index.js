import {
    FETCH_COMPANIES_START,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILED,
    FETCH_COMPANY_BY_ID_START,
    FETCH_COMPANY_BY_ID_SUCCESS,
    FETCH_COMPANY_BY_ID_FAILED,
    SEARCH_PRODUCT
} from './ActionTypes';

import {
    fetchCompaniesApi,
    fetchCompanyByIdApi,
} from '../api/index';

export const fetchCompanies = () => async dispatch => {
    dispatch({
        type: FETCH_COMPANIES_START
    });

    try {
        const companies = await fetchCompaniesApi();
        dispatch({
            type: FETCH_COMPANIES_SUCCESS,
            payload: companies,

        });
    } catch (err) {
        dispatch({
            type: FETCH_COMPANIES_FAILED,
            payload: err,
            error: true
        });
    }
};

export const fetchCompanyById = id => async dispatch => {
    dispatch({
        type: FETCH_COMPANY_BY_ID_START
    });

    try {
        const company = await fetchCompanyByIdApi(id);
        dispatch({
            type: FETCH_COMPANY_BY_ID_SUCCESS,
            payload: company,

        });
    } catch (err) {
        dispatch({
            type: FETCH_COMPANY_BY_ID_FAILED,
            payload: err,
            error: true
        });
    }
};

export const searchCompany = text => dispatch => {
    dispatch({
        type: SEARCH_PRODUCT,
        payload: text
    });
};