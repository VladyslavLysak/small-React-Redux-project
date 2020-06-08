import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getCompanies
} from '../selectors/index';

import Companies from '../components/Companies';
import Search from '../components/Search';
import Pagination from '../components/Pagination';


class Home extends Component {

  render() {
    const { companies, location } = this.props;
    const query = new URLSearchParams(location.search);
    const page = query.get("page")
    let currentPage = page ? page : 1;
    const offSet = 12;
    const indexOfLastCompany = currentPage * offSet;
    const indexOfFirstCompany = indexOfLastCompany - offSet;
    const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);
    const paginate = pageNumber => {
      currentPage = pageNumber;
    };

    return (
      <div className='container'>
        <div className='view-container'>
          <Search />
          <div className='table-navbar'>
            <Companies companies={currentCompanies} />
            <div className='pagitanion-container'>
              <Pagination companiesPerPage={offSet} totalCompanies={companies.length} paginate={paginate} location={location} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  companies: getCompanies(state, ownProps)
});

export default connect(mapStateToProps, null)(Home);
