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
  componentDidUpdate(prevProps: any, prevState: IAutocompleteState) {
    const isMenuHasToOpen = this.isMenuHasToOpen();
    if (prevState.isMenuOpen !== isMenuHasToOpen) {
      this.setStates({isMenuOpen: isMenuHasToOpen});
    }
  }

  onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    this.setStates({
      input: (e.target as HTMLLIElement).textContent,
      isItemSelected: true
    });
  }
  setStates(values: Partial<IAutocompleteState>, callback?: () => void) {
    this.setState(prevState => ({...prevState, ...values}), callback);
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
    this.setStates({
      input: value, isItemSelected: false, selectedItemIndex: -1
    });
    this.getOptions(value);
  }
  getNextSelectedItemIndex() {
    const index = this.state.selectedItemIndex;
    const itemsLength = this.props.options.items.length;
    if (itemsLength > 1 && index < itemsLength - 1) {
        return index + 1;
    }
    if (index === itemsLength - 1 || index === -1) {
        return 0;
    }
  }
  getPreviousSelectedItemIndex() {
    const index = this.state.selectedItemIndex;
    const itemsLength = this.props.options.items.length;
    if (itemsLength > 1 && index > 0) {
      return index - 1;
    }
    if (index === 0 || index === -1) {
      return itemsLength - 1;
    }
  }
  menuNavigate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.altKey || !this.state.isMenuOpen) {
      return;
    }
    switch (e.keyCode) {
      case KeyCode.UP:
        this.setStates(
          {
            selectedItemIndex: this.getPreviousSelectedItemIndex()
          },
        );
        break;
      case KeyCode.DOWN:
        this.setStates(
          {
            selectedItemIndex: this.getNextSelectedItemIndex()
          },
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
    return (this.props.options.isFetching || this.state.isItemSelected) ?
      false : this.props.options.items.length && value.length > 0;
  }
  onItemHover = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLLIElement).value;
    if (e.type === 'mouseenter') {
      this.setStates({selectedItemIndex: value});
    } else if (e.type === 'mouseleave') {
      this.setStates({selectedItemIndex: -1});
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
