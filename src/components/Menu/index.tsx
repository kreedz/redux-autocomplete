import React from 'react';

import styles from './styles.css';

const Menu = ({children}: {children: React.ReactNode}) => (
  <div className={`${styles.dropdownMenu} dropdown-menu`}>
    <ul className="list-unstyled">
      {children}
    </ul>
    <div className={`${styles.footer}`} />
  </div>
);

export default Menu;
