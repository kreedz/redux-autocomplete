import React from 'react'

import styles from './styles.css'

const Menu = props =>
  <ul className={`${styles.dropdownMenu} dropdown-menu list-unstyled`}>
    {props.children}
  </ul>

export default Menu
