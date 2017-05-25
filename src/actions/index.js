import axios from 'axios'

export const getOptions = (url, field) => dispatch => {
  return axios.get(url)
    .then(response => dispatch(getOptionsSuccess(response, field)))
    .catch(err => dispatch(getOptionsErr(err)))
}

const getOptionsSuccess = (response, field) => ({
  type: 'GET_OPTIONS_SUCCESS',
  payload: response,
  field
})

const getOptionsErr = (err) => ({
  type: 'GET_OPTIONS_ERR',
  payload: err
})
