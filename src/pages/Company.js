import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'

import { fetchCompanyById } from '../actions/index';
import { getCompanyById } from '../selectors/index';

class Company extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    await this.props.fetchCompanyById(this.props.match.params.id);
    this.setState({ isLoading: false });
  }

  renderContent() {

    const { company } = this.props;

    return (
      <tbody>
        <tr key={company.id}>
          <th>
            <h6>{company.id}</h6>
          </th>
          <th>
            <h6>{company.name}</h6>
          </th>
          <th>
            <h6>{company.city}</h6>
          </th>
          <th>
            <h6>{company.totalAmount}</h6>
          </th>
          <th>
            <h6>{company.averageAmount}</h6>
          </th>
          <th>
            <h6>{company.lastMonthAmount}</h6>
          </th>
        </tr>
      </tbody>
    );
  }

  render() {
    const { company } = this.props;
    return (
      <div className='container'>
        <div className='view-container'>
          <div className='search-container'>
          </div>
          <div className='table-navbar'>
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
                  <th>
                    <h4>Average income</h4>
                  </th>
                  <th>
                    <h4>Last month income</h4>
                  </th>
                </tr>
              </thead>
              {company && this.renderContent()}
            </table>
            {this.state.isLoading &&
              <div className='loading-container'>
                <ReactLoading type="spinningBubbles" color="black" height='100px' width='100px' />
              </div>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    company: getCompanyById(state, state.CompanyPage.id)
  };
}

const mapDispatchToProps = {
  fetchCompanyById
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);