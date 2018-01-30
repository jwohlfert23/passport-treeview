import React from 'react'
import TreeView from "./Treeview";
import {MenuItem, Dropdown} from 'react-bootstrap'
import ChildNode from "./ChildNode";
import bootbox from 'bootbox'
import HowManyModal from './HowManyModal'
import CreateChildModal from './CreateChildModal'

class ParentNode extends React.Component {

  constructor(props) {
    super(props);
  }

  rightClick(e) {
    const {parent, actions} = this.props;
    e.preventDefault();
    actions.setMenuOpen(parent.id, 'parent')
  }

  delete() {
    const {parent} = this.props;

    bootbox.confirm("Are you sure you want to delete this node?", (bool) => {
      if (bool) {
        axios.delete(`/parents/${parent.id}`)
      }
    })
  }

  render() {
    const {parent, runParentId, createChildId, contextMenuId, contextMenuLevel, actions} = this.props;

    const label = <Dropdown open={parent.id === contextMenuId && contextMenuLevel === 'parent'}
                            onToggle={() => actions.setMenuOpen(null)} id={'parent-menu-' + parent.id}>
    <button onContextMenu={this.rightClick.bind(this)} className="folder">
      <i className="glyphicon glyphicon-folder-open"></i> {parent.name} ({parent.min}-{parent.max})
    </button>
    <Dropdown.Menu>
      <MenuItem onClick={() => actions.setRunParent(parent.id)}>Run Generator</MenuItem>
      <MenuItem onClick={() => actions.setCreateChild(parent.id)}>Create</MenuItem>
      <MenuItem onClick={this.delete.bind(this)}>Delete</MenuItem>
    </Dropdown.Menu>
  </Dropdown>

    return <div>
      <TreeView label={label}>
        {parent.children.map((child, index) =>
          <ChildNode child={child} key={index} {...this.props} />
        )}
      </TreeView>

      {runParentId === parent.id ?
        <HowManyModal show onHide={() => actions.setRunParent(null)} {...this.props}/> : null}
      {createChildId === parent.id ?
        <CreateChildModal show onHide={() => actions.setCreateChild(null)} {...this.props}/> : null}

    </div>

  }
}

export default ParentNode;