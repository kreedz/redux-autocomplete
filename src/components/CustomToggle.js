import React from 'react'
import { FormControl } from 'react-bootstrap'

const CustomToggle = (props) =>
  <FormControl
    type="text"
    placeholder="Type to filter..."
    onClick={() => {}}
    onChange={props.filterDataList}
    value={props.getInput()}
  />

export default CustomToggle;