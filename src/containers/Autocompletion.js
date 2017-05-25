import React from 'react'
import { connect } from 'react-redux'

import { getOptions } from 'actions'

class Autocompletion extends React.Component {
  constructor() {
    super();
    this.state = {
      getOptionsSettings: {
        url: 'https://jsonplaceholder.typicode.com/users',
        field: 'name',
      }
    }
  }
  componentDidMount() {
    this.getOptions();
  }
  getOptions() {
    const {url, field} = this.state.getOptionsSettings;
    this.props.getOptions(url, field);
  }
  render() {
    const options = this.props.options.map(
      (item, index) => <option value={item} key={index}/>
    );
    return (
      <div>
        <input list="data" />
        <datalist id="data" ref={e => this.datalist = e}>
          {options}
        </datalist>
      </div>
    );
  }
}

const mapStateToProps = ({options}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocompletion)
