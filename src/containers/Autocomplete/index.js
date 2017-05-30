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
        url: 'https://jsonplaceholder.typicode.com/posts',
        field: 'title',
      },
      isItemSelected: false,
      input: '',
    }
  }
  componentDidMount() {
    this.getOptions();
  }
  onSelect(eventKey) {
    this.setStates({input: eventKey, isItemSelected: true});
  }
  setStates(values) {
    this.setState(prevState => ({...prevState, ...values}));
  }
  getInput() {
    return this.state.input;
  }
  getOptions(filterBy = '') {
    const {settingsGettingOptions: {url, field}} = this.state;
    this.props.getOptions(url, field, filterBy);
  }
  filterDataList(e) {
    const value = e.target.value;
    this.setStates({input: value, isItemSelected: false});
    this.getOptions(value);
  }
  getIsHaveToOpenMenu() {
    const value = this.state.input;
    if (this.props.options.isFetching || this.state.isItemSelected) {
      return false;
    }
    return this.props.options.items.length && value.length;
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