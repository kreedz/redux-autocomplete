import React from 'react'
import CSSModules from 'react-css-modules'
import { Dropdown } from 'react-bootstrap'

import styles from './styles.css'

class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: '' };
  }
  render() {
    const { children } = this.props;
    const { value } = this.state;

    return (
      <Dropdown.Menu>
         <ul className="list-unstyled" styleName="dropdown-menu">
           {
             React.Children.toArray(children).filter(child => (
              !value.trim() || child.props.children.indexOf(value) !== -1
            ))
           }
        </ul>
      </Dropdown.Menu>
    );
  }
}

export default CSSModules(CustomMenu, styles)
