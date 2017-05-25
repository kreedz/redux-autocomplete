import React from 'react'
import { connect } from 'react-redux'

import { getOptions } from 'actions'

class Autocompletion extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsGettingOptions: {
        url: 'https://jsonplaceholder.typicode.com/users',
        field: 'name',
      },
      filteredOptions: [],
    }
  }
  componentDidMount() {
    this.getOptions();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredOptions: nextProps.options,
    });
  }
  getOptions() {
    const {url, field} = this.state.settingsGettingOptions;
    this.props.getOptions(url, field);
  }
  filterDataList(e) {
    this.setState({
      filteredOptions: this.props.options.filter(
        item => item.startsWith(e.target.value)
      )
    });
  }
  render() {
    const options = this.state.filteredOptions.map(
      (item, index) => <option value={item} key={index}/>
    );
    return (
      <div>
        <input list="data" onChange={::this.filterDataList}/>
        <datalist id="data" ref={e => this.datalist = e}>
          {options}
        </datalist>
      </div>
    );
  }
}

const mapStateToProps = ({options}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocompletion)
