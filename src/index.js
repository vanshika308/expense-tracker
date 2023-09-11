import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index';
import { themeActions } from './store/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));


const storedTheme = localStorage.getItem('current-theme');

if (storedTheme === 'light' || storedTheme === 'dark') {
  store.dispatch(themeActions.setTheme({ theme: storedTheme }));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
