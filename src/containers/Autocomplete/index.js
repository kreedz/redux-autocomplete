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
      isItemSelected: false,
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
    this.setInput(value);
    this.getOptions(value);
    this.setIsItemSelected(false);
  }
  setIsItemSelected(value) {
    this.setState(prevState =>
      ({...prevState, isItemSelected: value})
    );
  }
  getIsHaveToOpenMenu() {
    const value = this.state.input;
    if (this.props.options.isFetching) {
      return false;
    }
    if (this.state.isItemSelected) {
      return false;
    }
    if (this.props.options.items.length && value.length) {
      return true;
    }
    return false;
  }
  setInput(value) {
    this.setState(prevState =>
      ({...prevState, input: value})
    );
  }
  getInput() {
    return this.state.input;
  }
  onSelect(eventKey) {
    this.setInput(eventKey);
    this.setIsItemSelected(true);
  }
  render() {
    const menu = this.props.options.items.map((item, index) =>
      <MenuItem eventKey={item} onSelect={::this.onSelect} key={index}>
        {item}
      </MenuItem>
    );
    return (
      <Dropdown id="dropdown-custom-2"
        className={::this.getIsHaveToOpenMenu() ? 'open' : ''}
      >
        <CustomToggle bsRole="toggle" filterDataList={::this.filterDataList}
          getInput={::this.getInput}
        />
        <CustomMenu bsRole="menu">
          {menu}
        </CustomMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = ({options}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocomplete)