import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Popup from "./../Popup";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import "./../Styles/usersSetting.css";

function formatIsoDate(date) {
  return date.split("T")[0];
}

function UsersSetting() {
  const [usersData, setUsersData] = useState();
  const [usersUpdated, setUsersUpdated] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    id: null,
  });
  const [newUserPopup, setNewUserPopup] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getusers`, { withCredentials: true })
      .then((res) => {
        if (res.data != null) {
          setUsersUpdated(false);
          setUsersData(res.data);
        }
      });
  }, [usersUpdated]);

  const handleDelete = (id) => {
    setPopup({
      show: true,
      id,
    });
  };

  const deleteUserById = (userId) => {
    axios
      .post(
        "http://localhost:5000/deleteuser",
        {
          userId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data == "success") {
          setUsersUpdated(true);
          setPopup({
            show: false,
            id: null,
          });
        }
      });
  };

  const AddNewUserSection = () => {
    return (
      <div className="addNewUserWrap">
        <span className="addNewUserText">Agregar usuario</span>
        <button
          className="addOrder"
          onClick={() => {
            setNewUserPopup(true);
          }}
        >
          <AddCircleOutlineRoundedIcon /> Add
        </button>
      </div>
    );
  };

  const handleSearch = () => {
    axios
    .get(`http://localhost:5000/getusers?username=${searchInput}`, { withCredentials: true })
    .then((res) => {
      if (res.data != null) {
        setUsersData(res.data);
      }
    });
  }

  const handleClickChange = (e) => {
    setSearchInput(e.target.value)
  }

  const SearchBar = () => (
    <div className="addOrderWrap">
      <input
        type="text"
        id="user-search"
        placeholder="Buscar por username"
        onChange={handleClickChange}
        value={searchInput}
      />
      <button
        className="addOrder"
        onClick={handleSearch}
      >
        <span className="addOrderText">Search</span>
      </button>
    </div>
  )

  const UsersDataTable = (props) => {
    return usersData ? (
      usersData?.map((user, index) => {
        return (
          <tr key={user.id} className={index % 2 != 0 ? "darkerTableBg" : ""}>
            <td className="alignCenter">
              <AccountCircleRoundedIcon className="maincolor" />
            </td>
            <td>{user.username}</td>
            <td className="alignCenter">{formatIsoDate(user.dateCreated)}</td>
            <td className="alignCenter">{user.role || 'normal'}</td>
            <td className="alignCenter">
              <DeleteForeverRoundedIcon
                className="clickable"
                onClick={() => {
                  handleDelete(user.id);
                }}
              />
            </td>
          </tr>
        );
      })
    ) : (
      <tr></tr>
    );
  };

  const NormalUsers = () => {
    return (
      <div className="usersColumn">
        <div className="adminUsersTable">
          <table className="usersTable normalUsersTable">
            <thead>
              <tr>
                <th className="alignCenter"></th>
                <th className="alignCenter">Nombre</th>
                <th className="alignCenter">Fecha de creación</th>
                <th className="alignCenter">Role</th>
                <th className="alignCenter"></th>
              </tr>
            </thead>
            <tbody>{<UsersDataTable />}</tbody>
          </table>
        </div>
      </div>
    );
  };

  const HandleDeletePopup = () => {
    const handleDeleteFalse = () => {
      setPopup({
        show: false,
        id: null,
      });
    };
    return (
      <Popup trigger={popup.show} setTrigger={setPopup}>
        <div className="popupWrap">
          <h3>Are you sure you want to delete this user?</h3>
          <div className="handleDeleteWrap">
            <button
              className="handleDeleteButton"
              onClick={() => {
                deleteUserById(popup.id);
              }}
            >
              Yes
            </button>
            <button
              className="handleDeleteButton"
              onClick={() => {
                handleDeleteFalse();
              }}
            >
              No
            </button>
          </div>
        </div>
      </Popup>
    );
  };

  const AddNewUserPopup = () => {
    const [userDetails, setUserDetails] = useState({
      username: "",
      password: "",
      role: "",
    });

    const addNewUser = () => {
      axios
        .post(
          "http://localhost:5000/newuser",
          {
            userDetails,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "success") {
            setUserDetails({
              username: "",
              password: "",
              role: "",
            });
            setUsersUpdated(true);
            setNewUserPopup(false);
          }
        });
    };
    return (
      <Popup trigger={newUserPopup} setTrigger={setNewUserPopup}>
        <div className="popupWrap">
          <div className="productsSummary">
            <h3 className="productSummaryLeft">Add new user</h3>
          </div>

          <div className="addNewOrderWrap">
            <div className="addNewOrderForm">
              <div className="orderDetails">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="orderDetailsInput orderDetailsInputHalf"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        username: e.target.value,
                      })
                    }
                    required="required"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="orderDetailsInput orderDetailsInputHalf"
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    required="required"
                  />
                </div>
                <div className="input-group">
                  <div className="usersInfoText">
                    If you want to user be an admin type 'admin' below.
                  </div>
                  <input
                    type="text"
                    placeholder="User role"
                    className="orderDetailsInput"
                    value={userDetails.role}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        role: e.target.value,
                      })
                    }
                    required="required"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="submitWrap">
            <div className="submitNewOrder">
              <button
                className="submitNewOrderBtn"
                onClick={() => addNewUser()}
              >
                <AddCircleOutlineRoundedIcon />
                <span className="addOrderText">Add</span>
              </button>
            </div>
          </div>
        </div>
      </Popup>
    );
  };

  return (
    <div className="usersSettingWrap">
      <AddNewUserSection />
      <SearchBar />
      <NormalUsers />
      <HandleDeletePopup />
      <AddNewUserPopup />
    </div>
  );
}

export default UsersSetting;
