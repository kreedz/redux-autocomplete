import React from 'react';

import styles from './styles.css';

const Menu: React.SFC<{children?: React.ReactNode}> = ({children}) => (
  <div className={`${styles.dropdownMenu} dropdown-menu`}>
    <ul className="list-unstyled">
      {children}
    </ul>
    <div className={`${styles.footer}`} />
  </div>
);

export default Menu;
