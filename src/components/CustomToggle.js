import React from 'react'
import { FormControl } from 'react-bootstrap'

export default class CustomToggle extends React.Component {
  handleClick() {}

  render() {
    return (
      <FormControl
        ref={e => this.input = e }
        type="text"
        placeholder="Type to filter..."
        onClick={::this.handleClick}
        onChange={this.props.filterDataList}
        value={this.props.getInput()}
      />
    );
  }
}
