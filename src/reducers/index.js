import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';

import Companies from './Companies';
import CompanyPage from './CompanyPage';
import CompaniesPage from './CompaniesPage';

export default history => combineReducers({
    Companies,
    CompanyPage,
    CompaniesPage,
    router: connectRouter(history)
});