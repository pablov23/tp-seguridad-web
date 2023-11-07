import React, { useState, useContext } from "react";
import "./Styles/adminPanel.css";
import UsersSetting from "./../Components/AdminPanelComponents/UsersSetting";
import { AuthLoginInfo } from './../AuthComponents/AuthLogin';
import { useCookies } from 'react-cookie';

function AdminPanel() {
  const [selectedSetting, setSelectedSetting] = useState(0);
  const componentsMap = {
    usersSetting: UsersSetting,
  };
  const adminNavData = [
    {
      id: 0,
      title: "Users",
      component: "usersSetting",
    },
  ];

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

  const CalendarWrap = (props) => {
    return (
      <div className="adminPanelWrap">
        <div className="adminPanelHeader">
          <h1>Panel de administrador</h1>
        </div>
        {props.children}
      </div>
    );
  };

  const AdminPanelNav = () => {
    return (
      <div className="adminNav">
        <ul className="adminNavList">
          {adminNavData.map((val) => {
            return (
              <li
                key={val.id}
                className={`adminNavItem ${
                  selectedSetting === val.id ? "active-setting" : ""
                }`}
                onClick={() => setSelectedSetting(val.id)}
              >
                {val.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const ContentWrap = (props) => {
    return (
      <div className="contentWrap">
        {adminNavData.map((val) => {
          if (val.id === selectedSetting) {
            const Component = componentsMap[val.component];
            return <Component key={val.id} />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="bodyWrap">
      {cookies.isAdmin ? ( 
        <CalendarWrap>
          <AdminPanelNav />
          <ContentWrap />
        </CalendarWrap>
      ) : (<>Hola</>)}
    </div>
  );
}

export default AdminPanel;
