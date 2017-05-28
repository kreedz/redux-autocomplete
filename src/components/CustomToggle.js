import React from 'react'
import { FormControl } from 'react-bootstrap'

export default class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  onKeyDown(e) {
    if (!this.props.open) {
      this.props.onClick(e);
    }
  }

  handleClick(e) {
    e.preventdefault();
    if (!this.props.open) {
      this.props.onClick(e);
    }
  }

  render() {
    return (
      <FormControl
        ref={c => { this.input = c; }}
        type="text"
        placeholder="Type to filter..."
      />
    );
  }
}
