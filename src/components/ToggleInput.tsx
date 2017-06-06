import React, { SFC } from 'react';
import { FormControl, FormControlProps } from 'react-bootstrap';

interface IProps extends FormControlProps {
  filterDataList(event: any): void;
  menuNavigate(event: any): void;
  getInput(): string;
}

const ToggleInput: SFC<IProps> = props => (
  <FormControl
    type="text"
    placeholder="Type to filter..."
    onChange={props.filterDataList}
    onKeyDown={props.menuNavigate}
    value={props.getInput()}
  />
);

export default ToggleInput;
