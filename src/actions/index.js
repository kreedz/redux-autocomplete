import axios from 'axios'

export const getOptions = (url, field, filterBy) => dispatch => {
   return axios.get(url)
    .then(response => dispatch(getOptionsSuccess(response, field, filterBy)))
    .catch(err => dispatch(getOptionsErr(err)))
}

const getOptionsSuccess = (response, field, filterBy) => ({
  type: 'GET_OPTIONS_SUCCESS',
  payload: response,
  field,
  filterBy,
})

const getOptionsErr = (err) => ({
  type: 'GET_OPTIONS_ERR',
  payload: err
})