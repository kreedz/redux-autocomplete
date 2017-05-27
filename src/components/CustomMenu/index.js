import React from 'react'
import CSSModules from 'react-css-modules'

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
      <div className="dropdown-menu" styleName="dropdown-menu">
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(child => (
            !value.trim() || child.props.children.indexOf(value) !== -1
          ))}
        </ul>
      </div>
    );
  }
}

export default CSSModules(CustomMenu, styles)
