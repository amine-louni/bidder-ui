import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
  user: {},
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const setUserAndToken = (user, token) => {
    setUser({ token, ...user });
    localStorage.setItem('user-token', token);
  };
  const resetUser = () => {
    setUser({});
    localStorage.removeItem('user-token');
  };
  useEffect(() => {
    const getUser = async () => {
      const storeToken = await localStorage.getItem('user-token');
      if (storeToken) {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${storeToken}`,
            },
          }
        );

        if (res.data.status === 'success') {
          setUser(res.data.data.data);
        } else {
          resetUser();
        }
      }
    };

    getUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUserAndToken,
        setUser,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;
