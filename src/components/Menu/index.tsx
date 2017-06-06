import React from 'react';

import styles from './styles.css';

const Menu: React.SFC<{children?: React.ReactNode}> = ({children}) => (
  <ul className={`${styles.dropdownMenu} dropdown-menu list-unstyled`}>
    {children}
  </ul>
);

export default Menu;
