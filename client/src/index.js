import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/Styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AuthLogin } from './AuthComponents/AuthLogin';
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <AuthLogin>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </AuthLogin>
    ,document.getElementById('root'));
registerServiceWorker();
