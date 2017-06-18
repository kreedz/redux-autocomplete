import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// actions
const getOptions = (url, field) => dispatch =>
  axios.get(url)
    .then(response => dispatch(getOptionsSuccess(response, field)));

const getOptionsSuccess = (response, field) => ({
  type: 'GET_OPTIONS_SUCCESS',
  payload: response,
  field,
});

const setFilterOptions = byName => ({
  type: 'SET_FILTER',
  payload: byName,
});

// reducer
const options = (state={options:[], filter:''}, action) => {
  switch(action.type) {
    case 'GET_OPTIONS_SUCCESS':
      console.log(action.payload);
      return {
        ...state, options: action.payload.data.map(data => data[action.field])
      };
    case 'SET_FILTER':
      return {
        ...state, filter: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(options, composeWithDevTools(applyMiddleware(thunk)));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://jsonplaceholder.typicode.com/users',
      field: 'name',
    };
  }
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
    store.dispatch(getOptions(this.state.url, this.state.field));
  }
  filterList = (e) => {
    store.dispatch(setFilterOptions(e.target.value));
  }
  render() {
    const filter = store.getState().filter;
    const options = store.getState().options
      .filter(option => option.startsWith(filter))
      .map((option, key) => <option value={option} key={key} />);
    console.log(options);
    return (
      <div>
        <input list="data" onChange={this.filterList}/>
        <datalist id="data">
          {options}
        </datalist>
      </div>
    );
  }
}

ReactDOM.render(
  <App />, document.getElementById('root')
);
