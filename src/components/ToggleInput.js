import React from 'react'
import { FormControl } from 'react-bootstrap'

const ToggleInput = props =>
  <FormControl
    type="text"
    placeholder="Type to filter..."
    onChange={props.filterDataList}
    onKeyDown={props.menuNavigate}
    value={props.getInput()}
  />

export default ToggleInput
