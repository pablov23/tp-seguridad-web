import React, { createContext, useEffect, useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const AuthLoginInfo = createContext({});
export function AuthLogin(props) {
  const [user, setUser] = useState();
  const [cookies, setCookie] = useCookies(['isAdmin']);
  useEffect(() => {
    axios.get("http://localhost:5000/user", { withCredentials: true}).then(res => {
      setCookie('isAdmin', res.data?.role === "admin" );
      setUser(res.data)
    })
  }, []);
  return (
    <AuthLoginInfo.Provider value={user}>{props.children}</AuthLoginInfo.Provider>
  )
}
