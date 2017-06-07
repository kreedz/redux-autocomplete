import axios, { AxiosError, AxiosResponse } from 'axios';
import { Action, Dispatch } from 'redux';

export interface IOptionsStore {
  isFetching: boolean;
  items: string[];
}

interface IOptionsAction extends Action {
  payload?: AxiosResponse | AxiosError;
  field?: string;
  filterBy?: string;
}

export const getOptions = (url: string, field: string, filterBy: string) =>
  (dispatch: Dispatch<IOptionsStore>) => {
    dispatch(getOptionsRequest());
    return axios.get(url)
      .then(response => dispatch(getOptionsSuccess(response, field, filterBy)))
      .catch(err => dispatch(getOptionsErr(err)));
  };

const getOptionsSuccess = (
    response: AxiosResponse, field: string, filterBy: string): IOptionsAction =>
  ({
    type: 'GET_OPTIONS_SUCCESS',
    payload: response,
    field,
    filterBy,
  });

const getOptionsErr = (err: AxiosError): IOptionsAction => ({
  type: 'GET_OPTIONS_ERR',
  payload: err
});

const getOptionsRequest = (): IOptionsAction =>
  ({
    type: 'GET_OPTIONS_REQUEST'
  });
