import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as R from 'ramda';

import ReactLoading from 'react-loading';

import {
  fetchCompanies
} from '../actions/index';

class Companies extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const { companies } = this.props;
    if (R.isEmpty(companies)) {
      await this.props.fetchCompanies();
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { companies } = this.props;
    const isCompaniesEmpty = R.isEmpty(companies);
    const renderCompany = (company) => {
      return (
        <tbody key={company.id}>
          <tr>
            <th>
              <h6>{company.id}</h6>
            </th>
            <th>
              <h6>
                <Link to={`/company/${company.id}`}>
                  {company.name}
                </Link>
              </h6>
            </th>
            <th>
              <h6>{company.city}</h6>
            </th>
            <th>
              <h6>{company.totalAmount}</h6>
            </th>
          </tr>
        </tbody>
      );
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <h4>Id</h4>
              </th>
              <th>
                <h4>Name</h4>
              </th>
              <th>
                <h4>City</h4>
              </th>
              <th>
                <h4>Total income</h4>
              </th>
            </tr>
          </thead>
          {companies.map(company => renderCompany(company))}
        </table>
        {!this.state.isLoading && isCompaniesEmpty && <span className='empty-container'><p>Company not found</p></span>}
        {this.state.isLoading &&
          <div className='loading-container'>
            <ReactLoading type="spinningBubbles" color="black" height='100px' width='100px' />
          </div>}
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchCompanies
};

export default connect(null, mapDispatchToProps)(Companies);
