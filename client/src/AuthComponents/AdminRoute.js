import React, { useContext } from 'react';
import { AuthLoginInfo } from './AuthLogin';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Styles/loadingPage.css';

function AdminRoute({ children }) {
  const user = useContext(AuthLoginInfo);
  const [cookies] = useCookies(['isAdmin']);
  if(user === undefined) {
    return (
      <div className="loading-page-wrapper">
        <div className="loading-page">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return cookies.isAdmin ? children : null ;

}
export default AdminRoute
