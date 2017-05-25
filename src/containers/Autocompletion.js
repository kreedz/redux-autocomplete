import React from 'react'
import { connect } from 'react-redux'

import { getOptions } from 'actions'

class Autocompletion extends React.Component {
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
        <button onClick={this.props.getOptions}>+</button>
      </div>
    );
  }
}

const mapStateToProps = ({options}) => ({options});
export default connect(mapStateToProps, {getOptions})(Autocompletion)
