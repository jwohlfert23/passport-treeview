const setMenuOpen = (id, node_level) => ({
  type: "PARENT_MENU_OPEN", id, node_level
})

const setRunParent = (parent) => ({
  type: "MODAL_RUN_PARENT", parent
})

const setCreateChild = (parent) => ({
  type: "MODAL_CREATE_CHILD", parent
})


const setData = (data) => ({
  type: "SET_DATA", data
})

const parentUpdated = (parent) => ({
  type: "PARENT_UPDATED", parent
})

const parentCreated = (parent) => ({
  type: "PARENT_CREATED", parent
})

const parentDeleted = (id) => ({
  type: "PARENT_DELETED", id
})

const childDeleted = (parentId, childId) => ({
  type: "CHILD_DELETED", parentId, childId
})

const childCreated = (child) => ({
  type: "CHILD_CREATED", child
})

export default {
  setMenuOpen,
  setRunParent,
  setCreateChild,
  setData,
  parentUpdated,
  parentCreated,
  parentDeleted,
  childDeleted,
  childCreated
}