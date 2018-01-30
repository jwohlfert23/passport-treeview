import React from 'react'
import TreeView from "./Treeview";
import {connect} from 'react-redux'
import {MenuItem, Dropdown} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import actions from '../actions'
import ParentNode from "./ParentNode";
import CreateParentModal from './CreateParentModal'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCreate: false
    }
  }

  render() {
    const {data} = this.props;

    return <div>

      <div className="text-right">
        <button className="btn btn-link" onClick={() => this.setState({showCreate: true})}>Create Factory +</button>
      </div>


      {data.map((parent, index) =>
        <ParentNode key={index} parent={parent} {...this.props} />
      )}

      <CreateParentModal show={this.state.showCreate} onHide={() => this.setState({showCreate: false})}/>
    </div>
  }
}

export default connect(
  (state) => state.tree,
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(App);