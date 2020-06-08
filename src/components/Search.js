import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GoSearch } from 'react-icons/go';

import { searchCompany } from '../actions/index';

import { getSearchString } from '../selectors/index';

class Search extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            value: props.newValue
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.searchCompany(this.state.value)
    }


    render() {
        return (
            <div className='search-container'>
                <div>
                    <form
                        onSubmit={this.handleSubmit}
                        className='search-form'
                    >
                        <div className='row-container'>
                            <input
                                onChange={this.handleChange}
                                type='text'
                                className='form-control'
                                placeholder='Enter company name'
                                value={this.state.value}
                            />
                            <button type='submit' onClick={this.handleSubmit} className='button button-search search-button-location'>
                                <span><GoSearch /></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    searchCompany
}

const mapStateToProps = (state, ownProps) => ({
    newValue: getSearchString(state, ownProps)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);