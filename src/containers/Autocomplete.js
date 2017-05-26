import React from 'react'
import { connect } from 'react-redux'

import { getOptions } from 'actions'

class Autocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsGettingOptions: {
        url: 'https://jsonplaceholder.typicode.com/users',
        field: 'name',
      },
      filterBy: '',
    }
  }
  componentDidMount() {
    this.getOptions();
  }
  getOptions(filterBy = this.state.filterBy) {
    const {settingsGettingOptions: {url, field}} = this.state;
    this.props.getOptions(url, field, filterBy);
  }
  filterDataList(e) {
    this.getOptions(e.target.value);
  }
  render() {
    const options = this.props.options.map((item, index) =>
      <option value={item} key={index}/>
    );
    return (
      <div>
        <input list="data" onChange={::this.filterDataList}/>
        <datalist id="data">
          {options}
        </datalist>
      </div>
    );
  }
}

const mapStateToProps = ({options}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocomplete)