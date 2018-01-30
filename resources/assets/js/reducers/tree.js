const initialState = {
  data: [],
  contextMenuLevel: 'parent',
  contextMenuId: null,
  runParentId: null,
  createChildId: null
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case "PARENT_MENU_OPEN":
      return {
        ...state,
        contextMenuId: action.id,
        contextMenuLevel: action.node_level
      }
    case "MODAL_RUN_PARENT":
      return {
        ...state,
        runParentId: action.parent
      }
    case "MODAL_CREATE_CHILD":
      return {
        ...state,
        createChildId: action.parent
      }
    case "SET_DATA":
      return {
        ...state,
        data: action.data
      }
    case "PARENT_UPDATED":
      return {
        ...state,
        data: state.data.map(p => {
          if (p.id === action.parent.id)
            return action.parent;
          return p;
        })
      }
    case "PARENT_CREATED":
      return {
        ...state,
        data: [...state.data, action.parent]
      }
    case "PARENT_DELETED":
      return {
        ...state,
        data: state.data.filter(p => p.id !== action.id)
      }

    case "CHILD_DELETED":
      const children = state.data.filter(p => p.id === action.parentId)[0].children.filter(c => c.id !== action.childId)

      return {
        ...state,
        data: state.data.map(p => {
          if (p.id === action.parentId)
            return {...p, children}
          return p;
        })
      }

    case "CHILD_CREATED":
      return {
        ...state,
        data: state.data.map(p => {
          if (p.id === action.child.parent_id)
            return {...p, children: [...p.children, action.child]}
          return p;
        })
      }
    default:
      return state;
  }
}