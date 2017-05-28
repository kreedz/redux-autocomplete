import React from 'react'
import { connect } from 'react-redux'
import { FormControl, Dropdown, MenuItem } from 'react-bootstrap'

import CustomMenu from 'components/CustomMenu'
import { getOptions } from 'actions'


class Autocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsGettingOptions: {
        url: 'https://jsonplaceholder.typicode.com/users',
        field: 'name',
      },
      isMenuOpen: false,
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
    this.getOptions(value);
    this.onChange(value);
  }
  toggleMenu() {
    this.setState(prevState =>
        ({...prevState, isMenuOpen: !prevState.isMenuOpen})
    );
  }
  onChange(value) {
    console.log('onChange value:', value, 'options.length:', this.props.options.length);
    if (!this.state.isMenuOpen && this.props.options.length && value) {
      this.toggleMenu();
    }
    if (this.state.isMenuOpen && !value) {
      this.toggleMenu();
    }
    if (this.state.isMenuOpen && !this.props.options.length) {
      this.toggleMenu();
    }
  }
  render() {
    const menu = this.props.options.map((item, index) =>
      <MenuItem key={index}>{item}</MenuItem>
    );
    return (
      <div>
        <Dropdown id="dropdown-custom-2"
          className={this.state.isMenuOpen ? 'open' : ''}
        >
          <FormControl bsRole="toggle" className="form-control"
            ref={c => { this.input = c; }}
            type="text"
            placeholder="Type to filter..."
            onChange={::this.filterDataList}
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
