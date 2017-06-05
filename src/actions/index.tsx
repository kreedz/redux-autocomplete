import axios, { AxiosError, AxiosResponse } from 'axios';
import { MiddlewareAPI } from 'redux';

export const getOptions = (url: string, field: string, filterBy: string) =>
  ({ dispatch }: MiddlewareAPI<any>) => {
    dispatch(getOptionsRequest());
    return axios.get(url)
      .then(response => dispatch(getOptionsSuccess(response, field, filterBy)))
      .catch(err => dispatch(getOptionsErr(err)));
  };

const getOptionsSuccess = (
  response: AxiosResponse, field: string, filterBy: string) => ({
    type: 'GET_OPTIONS_SUCCESS',
    payload: response,
    field,
    filterBy,
  });

const getOptionsErr = (err: AxiosError) => ({
  type: 'GET_OPTIONS_ERR',
  payload: err
});

const getOptionsRequest = () => ({ type: 'GET_OPTIONS_REQUEST' });
