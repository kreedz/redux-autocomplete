import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, MenuItem, FormControl } from 'react-bootstrap'

import { getOptions } from 'actions'

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.onChange = e => this.setState({ value: e.target.value });

    this.state = { value: '' };
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <FormControl
        ref={c => { this.input = c; }}
        type="text"
        placeholder="Type to filter..."
        onChange={this.onChange}
        onClick={this.handleClick}
        value={this.state.value}
    />
    );
  }
}

class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = e => this.setState({ value: e.target.value });

    this.state = { value: '' };
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return (
      <div className="dropdown-menu" style={{ padding: '' }}>
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(child => (
            !value.trim() || child.props.children.indexOf(value) !== -1
          ))}
        </ul>
      </div>
    );
  }
}

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