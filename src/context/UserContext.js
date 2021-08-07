import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
  user: {},
  userLoading: {},
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);

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
      setUserLoading(true);
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
          console.log('me', res.data.data);
          setUser(res.data.data);
          setUserLoading(false);
        } else {
          resetUser();
          setUserLoading(false);
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
        userLoading,
        setUserLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;
