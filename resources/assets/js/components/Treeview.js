import React from 'react';
import PropTypes from 'prop-types';

class TreeView extends React.PureComponent {
  propTypes: {
    label: PropTypes.node.isRequired,
    defaultCollapsed: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.defaultCollapsed
    };
  }

  handleClick() {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    const {label, children} = this.props;
    const {collapsed} = this.state;

    let itemClass = '';
    let arrowClass = 'tree-arrow';
    let childrenClass = 'tree-children';

    if (collapsed) {
      arrowClass += ' tree-arrow-collapsed';
      childrenClass += ' tree-children-collapsed';
    }

    if (children && children.length > 0) {
      itemClass += ' has-children'
    }

    const arrow = (
      <div
        className={arrowClass}
        onClick={this.handleClick.bind(this)}
      />
    );

    return (
      <div className="tree">
        <div className={"tree-item " + itemClass}>
          {arrow}
          {label}
        </div>
        <div className={childrenClass}>
          {collapsed ? null : children}
        </div>
      </div>
    );
  }
}

export default TreeView;