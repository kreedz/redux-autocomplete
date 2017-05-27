import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, MenuItem } from 'react-bootstrap'

import CustomToggle from 'components/CustomToggle'
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
    this.getOptions(e.target.value);
  }
  render() {
    const options = this.props.options.map((item, index) =>
      <option value={item} key={index}/>
    );
    return (
      <div>
        <input list="data" onChange={::this.filterDataList}/>
        <datalist id="data">
          {options}
        </datalist>
        <br />
        <Dropdown id="dropdown-custom-menu">
          <CustomToggle bsRole="toggle" />

          <CustomMenu bsRole="menu">
            <MenuItem eventKey="1">Red</MenuItem>
            <MenuItem eventKey="2">Blue</MenuItem>
            <MenuItem eventKey="3" active>Orange</MenuItem>
            <MenuItem eventKey="1">Red-Orange</MenuItem>
          </CustomMenu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = ({options}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocomplete)
