import React from 'react'
import { FormControl } from 'react-bootstrap'

export default class CustomToggle extends React.Component {
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
