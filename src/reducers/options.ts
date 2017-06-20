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

const initialState: IOptionsState = {isFetching: false, items: []};

const options = (
    state: IOptionsState = initialState,
    action: IOptionsAction
): IOptionsState => {
  const {field, filterBy} = action;
  let partialState: Partial<IOptionsState> | undefined;
  const getNonUndefinedValue = (itemField: string) =>
    itemField == null ? '' : itemField;
  switch (action.type) {
    case 'GET_OPTIONS_SUCCESS':
      partialState = {
        items: action.payload.data.reduce(
          (items: string[], item: IItem) =>
            getNonUndefinedValue(item[field]).startsWith(filterBy) ?
              (items.push(item[field]), items) :
                items,
          []
        ),
        isFetching: false,
      };
      break;
    case 'GET_OPTIONS_REQUEST':
      partialState = {
        isFetching: true,
      };
      break;
    case 'GET_OPTIONS_ERR':
    default:
      partialState = null;
      break;
  }
  return partialState != null ? {...state, ...partialState} : state;
};

export default options;
