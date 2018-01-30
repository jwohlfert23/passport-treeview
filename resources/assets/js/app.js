import React from 'react'
import ReactDOM from 'react-dom'
import './bootstrap'
import App from './components/App'
import store from './store'
import {Provider} from 'react-redux'
import actions from './actions'
import {bindActionCreators} from 'redux'
import echo from 'laravel-echo'
import 'pusher-js'

const Echo = window.Echo = new echo({
  broadcaster: 'pusher',
  key: 'c0f847f565f27ab1d6d0',
  cluster: 'us2',
  encrypted: true
});


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app-container')
)

const a = bindActionCreators(actions, store.dispatch)

axios.get('/parents').then(({data}) => {
  a.setData(data);
})

Echo.channel('tree')
  .listen('ParentUpdated', (e) => {
    a.parentUpdated(e.parent)
  })
  .listen('ParentCreated', (e) => {
    a.parentCreated(e.parent)
  })
  .listen('ParentDeleted', (e) => {
    a.parentDeleted(e.parentId)
  })
  .listen('ChildDeleted', (e) => {
    a.childDeleted(e.parentId, e.childId)
  })
  .listen('ChildCreated', (e) => {
    a.childCreated(e.child)
  });