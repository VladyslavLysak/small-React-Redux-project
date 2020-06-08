import * as R from 'ramda';

export const getCompanyById = (state, id) => R.prop(id, state.Companies);

export const getSearchString = (state, ownProps) => state.CompaniesPage.search;

export const getCompanies = (state, ownProps) => {

    const applySearch = item => R.contains(
        state.CompaniesPage.search.toLowerCase(),
        R.prop('name', item).toLowerCase()
    );

    const totalAmount = item => R.prop('totalAmount', item);

    const companies = R.compose(
        R.filter(applySearch),
        R.sortWith([R.descend(totalAmount), R.ascend(totalAmount)]),
        R.map(id => getCompanyById(state, id))
    )(state.CompaniesPage.ids);

    return companies;
};
