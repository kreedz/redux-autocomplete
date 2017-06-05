import { AxiosResponse } from 'axios';

interface IState {
  isFetching: boolean;
  items: string[];
}

interface IAction {
  type: string,
  payload: AxiosResponse,
  field: string;
  filterBy: string;
}

interface IItem {
  [key: string]: string;
}

const options = (state: IState = {isFetching: false, items: []}, action: IAction) => {
  const {field, filterBy} = action;
  switch (action.type) {
    case 'GET_OPTIONS_SUCCESS':
      return {
        ...state,
        items: action.payload.data.reduce(
          (items: string[], item: IItem) =>
            item[field].startsWith(filterBy) ?
              (items.push(item[field]), items) :
                items,
          []
        ),
        isFetching: false,
      };
    case 'GET_OPTIONS_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'GET_OPTIONS_ERR':
    default:
      return state;
  }
};

export default options;
