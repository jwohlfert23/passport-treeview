import {combineReducers} from 'redux'

import tree from './tree'

import {reducer as form} from 'redux-form';

export default combineReducers({
  tree, form
})
