import React from 'react';
import Alpine from 'alpinejs';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import './index.css'
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
// import { BrowserRouter } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import history from './browserHistory';

Alpine.start();

// const history = createBrowserHistory( { window });

ReactDOM.render(
    <HistoryRouter history={history}>
    <StoreContext.Provider value={store}>
    <App/>
    </StoreContext.Provider>
    </HistoryRouter>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
