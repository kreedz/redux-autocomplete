import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { getOptions } from 'actions'
import Menu from 'components/Menu'
import ToggleInput from 'components/ToggleInput'

import styles from './styles.css'

class Autocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsGettingOptions: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        field: 'title',
      },
      isItemSelected: false,
      isMenuOpen: false,
      input: '',
      activeMenuIndex: -1,
      selectedMenuIndex: -1,
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
  setStates(values) {
    this.setState(prevState => ({...prevState, ...values}));
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
    this.setStates({input: value, isItemSelected: false});
    this.getOptions(value);
  }
  menuNavigate(e) {
    if (!e.altKey) {
      return;
    }
    switch(e.keyCode) {
      case 38:
        this.setStates({
          activeMenuIndex: this.state.activeMenuIndex - 1
        });
        var li = ReactDOM.findDOMNode(this._menuItemNodes.get(this.state.activeMenuIndex - 1));
        var liCoord = li.getBoundingClientRect();
        var ul = li.parentElement;
        var ulCoord = ul.getBoundingClientRect();
        if (liCoord.top < ulCoord.top) {
          ul.scrollTop = liCoord.top;
        }
        console.log(this._menuItemNodes.get(this.state.activeMenuIndex - 1));
        console.log(li.textContent, li.getBoundingClientRect(), 'li.offsetTop:',li.offsetTop, 'li.parentElement.offsetTop:', li.parentElement.offsetTop, ', scrollTop:', li.parentElement.scrollTop
          ,'parentElementTop:', li.parentElement.Top
      );

        break;
      case 40:
        this.setStates({
          activeMenuIndex: this.state.activeMenuIndex + 1
        })
        console.log('down key');
        break;
      case 13:
        console.log('enter');
    }
  }
  isMenuHasToOpen() {
    const value = this.state.input;
    return (this.props.options.isFetching || this.state.isItemSelected) ? false :
      this.props.options.items.length && value.length
  }
  onItemHover(e) {
    const value = e.target.value;
    if (e.type == 'mouseenter') {
      this.setStates({selectedMenuIndex: value});
    } else if (e.type === 'mouseleave') {
      this.setStates({selectedMenuIndex: -1});
    }
  }
  render() {
    const menu = this.props.options.items.map((item, index) =>
      <li onMouseEnter={::this.onItemHover} onMouseLeave={::this.onItemHover}
        onClick={::this.onClick}
        key={index} value={index}
        className={index === this.state.selectedMenuIndex ? styles.onHover : ''}
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
