import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, MenuItem } from 'react-bootstrap'

import CustomMenu from 'components/CustomMenu'
import CustomToggle from 'components/CustomToggle'
import { getOptions } from 'actions'


class Autocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsGettingOptions: {
        url: 'https://jsonplaceholder.typicode.com/users',
        field: 'name',
      },
      input: '',
    }
  }
  componentDidMount() {
    this.getOptions();
  }
  getOptions(filterBy = '') {
    const {settingsGettingOptions: {url, field}} = this.state;
    this.props.getOptions(url, field, filterBy);
  }
  filterDataList(e) {
    const value = e.target.value;
    this.setState(prevState =>
      ({...prevState, input: value})
    );
    this.getOptions(value);
  }
  getHaveToToggleMenu() {
    const value = this.state.input;
    if (this.props.options.length && value.length) {
      return true;
    }
    if (!value.length) {
      return false;
    }
    if (!this.props.options.length) {
      return false;
    }
    return false;
  }
  getInput() {
    return this.state.input;
  }
  render() {
    const menu = this.props.options.map((item, index) =>
      <MenuItem key={index}>{item}</MenuItem>
    );
    return (
      <div>
        <Dropdown id="dropdown-custom-2"
          className={::this.getHaveToToggleMenu() ? 'open' : ''}
        >
          <CustomToggle bsRole="toggle" filterDataList={::this.filterDataList}
            getInput={::this.getInput}
          />
          <CustomMenu bsRole="menu">
            {menu}
          </CustomMenu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = ({options}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocomplete)
