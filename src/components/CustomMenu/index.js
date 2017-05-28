import React from 'react'
import CSSModules from 'react-css-modules'
import { Dropdown } from 'react-bootstrap'

import styles from './styles.css'

class CustomMenu extends React.Component {
  render() {
    return (
      <Dropdown.Menu>
         <ul className="list-unstyled" styleName="dropdown-menu">
           {this.props.children}
        </ul>
      </Dropdown.Menu>
    );
  }
}

export default CSSModules(CustomMenu, styles)
