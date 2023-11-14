import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Styles/homepage.css";
import { AuthLoginInfo } from "./../AuthComponents/AuthLogin";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";

const colors = [
  { background: '#D8F3DC', color: 'black' },
  { background: '#B7E4C7', color: 'black' },
  { background: '#95D5B2', color: 'black' },
  { background: '#74C69D', color: 'black' },
  { background: '#52B788', color: 'black' },
  { background: '#40916C', color: 'black' },
  { background: '#2D6A4F', color: 'white' },
  { background: '#1B4332', color: 'white' },
  { background: '#081C15', color: 'white' },
]

function generateRandom(stringParam) {
  const maxInt = 8
  let sum = 0;
  for (let i = 0; i < stringParam.length; i++){
    sum += stringParam.charCodeAt(i);
  }
  let result = sum % maxInt;
  return result;
}

function Homepage() {
  const ctx = useContext(AuthLoginInfo);
  const isAuthenticated = !Array.isArray(ctx);
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard_data", { withCredentials: true })
      .then((res) => {
        if (res.data != null) {
          setDashboardData(res.data);
        }
      });
  }, []);

  const TopPanel = () => {
    return (
      <div className="topPanelWrap">
        <div className="topPanelDataRangeBox">
          <h3>Show accounts' balance</h3>
        </div>
        <div className="topPanelData">
          {dashboardData.length && dashboardData?.map((account) => (
          <div className="topPanelDataBox" key={account.id} style={{ ...colors[generateRandom(account.number)] }}>
            <div className="topPanelDataIcon">
              <PaymentsRoundedIcon />
            </div>

            <div className="topPanelDataSummary">
              <p>Account: {account.number}</p>
              <h3 className="topPanelDataText">
                ${account.balance}
              </h3>
            </div>
          </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bodyWrap dashboardPage">
      <TopPanel />
    </div>
  );
}

export default Homepage;
