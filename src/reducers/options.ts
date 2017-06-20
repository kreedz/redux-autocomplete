import { AxiosResponse } from 'axios';
import { Action } from 'redux';

interface IOptionsState {
  isFetching: boolean;
  items: string[];
}

interface IOptionsAction extends Action {
  type: string,
  payload?: AxiosResponse,
  field?: string;
  filterBy?: string;
}

interface IItem {
  [key: string]: string;
}

const getFilteredItems = (
  data: AxiosResponse['data'],
  field: IOptionsAction['field'],
  filterBy: IOptionsAction['filterBy']
) =>
  data.reduce(
    (items: IOptionsState['items'], item: IItem) =>
      getNonUndefinedValue(item[field]).startsWith(filterBy) ?
        (items.push(item[field]), items) :
          items,
    []
  );

const getNonUndefinedValue = (itemField: string) =>
  itemField == null ? '' : itemField;

const initialState: IOptionsState = {isFetching: false, items: []};

const options = (
    state: IOptionsState = initialState,
    action: IOptionsAction
): IOptionsState => {
  const {field, filterBy} = action;
  switch (action.type) {
    case 'GET_OPTIONS_SUCCESS':
      return {
        ...state,
        items: getFilteredItems(action.payload.data, field, filterBy),
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
