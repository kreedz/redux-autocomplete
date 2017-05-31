import React from 'react'
import { connect } from 'react-redux'

import { getOptions } from 'actions'
import Menu from 'components/Menu'
import ToggleInput from 'components/ToggleInput'

import styles from './styles.css'

const KeyCode = {
  UP: 38,
  DOWN: 40,
  RETURN: 13,
}

class Autocomplete extends React.Component {
  constructor() {
    super();
    this._menuItemNodes = new Map();
    this.state = {
      settingsGettingOptions: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        field: 'title',
      },
      isItemSelected: false,
      isMenuOpen: false,
      input: '',
      selectedItemIndex: -1,
    }
  }
  componentDidMount() {
    this.getOptions();
  }
  componentDidUpdate(prevProps, prevState) {
    const isMenuHasToOpen = this.isMenuHasToOpen();
    if (prevState.isMenuOpen !== isMenuHasToOpen) {
      this.setStates({isMenuOpen: isMenuHasToOpen});
    }
  }

  onClick(e) {
    this.setStates({input: e.target.textContent, isItemSelected: true});
  }
  setStates(values, callback) {
    this.setState(prevState => ({...prevState, ...values}), callback);
  }
  getInput() {
    return this.state.input;
  }
  getOptions(filterBy = '') {
    const {settingsGettingOptions: {url, field}} = this.state;
    this.props.getOptions(url, field, filterBy);
  }
  filterDataList(e) {
    const value = e.target.value;
    this.setStates({input: value, isItemSelected: false, selectedItemIndex: -1});
    this.getOptions(value);
  }
  getNextSelectedItemIndex() {
    const index = this.state.selectedItemIndex;
    const itemsLength = this.props.options.items.length;
    if (itemsLength > 1 && index < itemsLength - 1) {
        return index + 1;
    }
    if (index == itemsLength - 1 || index == -1) {
        return 0;
    }
  }
  getPreviousSelectedItemIndex() {
    const index = this.state.selectedItemIndex;
    const itemsLength = this.props.options.items.length;
    if (itemsLength > 1 && index > 0) {
      return index - 1;
    }
    if (index == 0 || index == -1) {
      return itemsLength - 1;
    }
  }
  scrollMenu() {
    const li = this._menuItemNodes.get(this.state.selectedItemIndex);
    const liCoord = li.getBoundingClientRect();
    const ul = li.parentElement;
    const ulCoord = ul.getBoundingClientRect();
    if (liCoord.top < ulCoord.top) {
      ul.scrollTop -= ulCoord.top - liCoord.top;
    } else if (liCoord.bottom > ulCoord.bottom) {
      ul.scrollTop += liCoord.bottom - ulCoord.bottom;
    }
  }
  menuNavigate(e) {
    if (!e.altKey || !this.state.isMenuOpen) {
      return;
    }
    switch(e.keyCode) {
      case KeyCode.UP:
        this.setStates(
          {
            selectedItemIndex: this.getPreviousSelectedItemIndex()
          },
          this.scrollMenu
        );
        break;
      case KeyCode.DOWN:
        this.setStates(
          {
            selectedItemIndex: this.getNextSelectedItemIndex()
          },
          this.scrollMenu
        );
        break;
      case KeyCode.RETURN:
        this.setStates({
            input: this.props.options.items[this.state.selectedItemIndex],
            isItemSelected: true
        });
    }
  }
  isMenuHasToOpen() {
    const value = this.state.input;
    return (this.props.options.isFetching || this.state.isItemSelected) ? false :
      this.props.options.items.length && value.length > 0
  }
  onItemHover(e) {
    const value = e.target.value;
    if (e.type == 'mouseenter') {
      this.setStates({selectedItemIndex: value});
    } else if (e.type === 'mouseleave') {
      this.setStates({selectedItemIndex: -1});
    }
  }
  render() {
    const menu = this.props.options.items.map((item, index) =>
      <li onMouseEnter={::this.onItemHover} onMouseLeave={::this.onItemHover}
        onClick={::this.onClick}
        key={index} value={index}
        className={index === this.state.selectedItemIndex ? styles.onHover : ''}
        ref={e => this._menuItemNodes.set(index, e)}
      >
        {item}
      </li>
    );
    const open = this.state.isMenuOpen ? 'open' : '';
    return (
      <div>
        <div className={`dropdown ${open}`}>
          <ToggleInput filterDataList={::this.filterDataList}
            getInput={::this.getInput} menuNavigate={::this.menuNavigate}
          />
          <Menu>
            {menu}
          </Menu>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({options}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocomplete)
