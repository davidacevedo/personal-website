import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux'
import rootReducer from './reducers';
import routes from './routes';

let history = useRouterHistory(createHashHistory)({ queryKey: false });
const store = createStore(rootReducer);
history = syncHistoryWithStore(history, store, {
  selectLocationState: (state) => state.get('routing').toJS(),
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
