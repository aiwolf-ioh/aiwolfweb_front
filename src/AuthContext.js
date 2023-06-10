// ログイン状態の管理

import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => undefined,
    logout: () => undefined,
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // ログイン処理
    setIsLoggedIn(true);
  };

  const logout = () => {
    // ログアウト処理
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
