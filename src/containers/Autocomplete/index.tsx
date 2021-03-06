import React from 'react';
import { connect } from 'react-redux';

import { getOptions, IOptionsStore } from 'actions';
import Menu from 'components/Menu';
import ToggleInput from 'components/ToggleInput';

import styles from './styles.css';

const KeyCode = {
  UP: 38,
  DOWN: 40,
  RETURN: 13,
};

interface IAutocompleteState {
  settingsGettingOptions: {
    url: string;
    field: string;
  };
  isItemSelected: boolean,
  isMenuOpen: boolean,
  input: string,
  selectedItemIndex: number,
}

class Autocomplete extends React.Component<any, any> {
  private menuItemNodes: Map<number, HTMLElement>;

  constructor() {
    super();
    this.menuItemNodes = new Map();
    this.state = {
      settingsGettingOptions: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        field: 'title',
      },
      isItemSelected: false,
      isMenuOpen: false,
      input: '',
      selectedItemIndex: -1,
    };
  }

  componentDidMount() {
    this.getOptions();
  }

  componentDidUpdate(prevProps: any, prevStateArg: IAutocompleteState) {
    const isMenuHasToOpen = this.isMenuHasToOpen();
    if (prevStateArg.isMenuOpen !== isMenuHasToOpen) {
      this.setState(prevState => ({...prevState, isMenuOpen: isMenuHasToOpen}));
    }
  }

  onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const input = (e.target as HTMLLIElement).textContent;
    this.setState(prevState => ({...prevState, input, isItemSelected: true}));
  }

  getInput = () => {
    return this.state.input;
  }

  getOptions(filterBy = '') {
    const {settingsGettingOptions: {url, field}} = this.state;
    this.props.getOptions(url, field, filterBy);
  }

  filterDataList = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    this.setState(prevState => ({
      ...prevState, input: value, isItemSelected: false, selectedItemIndex: -1
    }));
    this.getOptions(value);
  }

  getNextSelectedItemIndex() {
    const { selectedItemIndex } = this.state;
    const { length } = this.props.options.items;
    if (length > 1 && selectedItemIndex < length - 1) {
        return selectedItemIndex + 1;
    }
    if (selectedItemIndex === length - 1 || selectedItemIndex === -1) {
        return 0;
    }
  }

  getPreviousSelectedItemIndex() {
    const { selectedItemIndex } = this.state;
    const { length } = this.props.options.items;
    if (length > 1 && selectedItemIndex > 0) {
      return selectedItemIndex - 1;
    }
    if (selectedItemIndex === 0 || selectedItemIndex === -1) {
      return length - 1;
    }
  }

  menuNavigate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.altKey || !this.state.isMenuOpen) {
      return;
    }
    switch (e.keyCode) {
      case KeyCode.UP:
        this.setState(prevState => ({
          ...prevState,
          selectedItemIndex: this.getPreviousSelectedItemIndex()
        }));
        break;
      case KeyCode.DOWN:
        this.setState(prevState => ({
          ...prevState,
          selectedItemIndex: this.getNextSelectedItemIndex()
        }));
        break;
      case KeyCode.RETURN:
        this.setState(prevState => ({
          ...prevState,
          input: this.props.options.items[this.state.selectedItemIndex],
          isItemSelected: true
        }));
    }
  }

  isMenuHasToOpen() {
    const { input } = this.state;
    return (this.props.options.isFetching || this.state.isItemSelected) ?
      false : this.props.options.items.length && input.length > 0;
  }

  onItemHover = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLLIElement).value;
    if (e.type === 'mouseenter') {
      this.setState(prevState => ({...prevState, selectedItemIndex: value}));
    } else if (e.type === 'mouseleave') {
      this.setState(prevState => ({...prevState, selectedItemIndex: -1}));
    }
  }

  render() {
    const setMenuItem = (index: number) =>
      (e: HTMLLIElement) =>
        this.menuItemNodes.set(index, e);
    const menu = this.props.options.items.map((item: string, index: number) => (
      <li
        onMouseEnter={this.onItemHover}
        onMouseLeave={this.onItemHover}
        onClick={this.onClick}
        key={index}
        value={index}
        className={index === this.state.selectedItemIndex ? styles.onHover : ''}
        ref={setMenuItem(index)}
      >
        {item}
      </li>
    ));
    const open = this.state.isMenuOpen ? 'open' : '';
    return (
      <div>
        <div className={`dropdown ${open}`}>
          <ToggleInput
            filterDataList={this.filterDataList}
            getInput={this.getInput}
            menuNavigate={this.menuNavigate}
          />
          <Menu>
            {menu}
          </Menu>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({options}: {options: IOptionsStore}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocomplete);
