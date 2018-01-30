import React from 'react'
import TreeView from "./Treeview";
import {MenuItem, Dropdown} from 'react-bootstrap'
import bootbox from 'bootbox'

class ChildNode extends React.Component {

  constructor(props) {
    super(props)
  }

  rightClick(e) {
    const {actions, child} = this.props;
    e.preventDefault();
    actions.setMenuOpen(child.id, 'child')
  }


  delete() {
    const {child} = this.props;

    bootbox.confirm("Are you sure you want to delete this node?", (bool) => {
      if (bool) {
        axios.delete(`/parents/${child.parent_id}/children/${child.id}`)
      }
    })
  }

  render() {
    const {child, contextMenuId, contextMenuLevel, actions} = this.props;

    const label = <Dropdown open={child.id === contextMenuId && contextMenuLevel === 'child'}
                            onToggle={() => actions.setMenuOpen(null)} id={'child-menu-' + child.id}>
      <button onContextMenu={this.rightClick.bind(this)} className="folder">
        <i className="glyphicon glyphicon-folder-open"></i> {child.num}
      </button>
      <Dropdown.Menu>
        <MenuItem onClick={this.delete.bind(this)}>Delete</MenuItem>
      </Dropdown.Menu>
    </Dropdown>


    return <TreeView label={label}/>

  }
}

export default ChildNode