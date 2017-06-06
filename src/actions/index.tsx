import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';

interface ISettingsGettingOptions {
  url: string;
  field: string;
}

interface IStore {
  settingsGettingOptions: ISettingsGettingOptions;
  isItemSelected: boolean,
  isMenuOpen: boolean,
  input: string,
  selectedItemIndex: number,
}

export const getOptions = (url: string, field: string, filterBy: string) =>
  (dispatch: Dispatch<IStore>) => {
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
