// アラート表示状態の管理

import React, { createContext, useState } from 'react';

export const AlertContext = createContext({
  showAlert: false,
  alertCompleted: false,
  alertMessage: '',
  alertType: '',
});

export const setAlertContext = createContext({
  setShowAlert: () => undefined,
  setAlertCompleted: () => undefined,
  setAlertMessage: () => undefined,
  setAlertType: () => undefined
});

export const AlertProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertCompleted, setAlertCompleted] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  return (
    <AlertContext.Provider value={{ showAlert, alertCompleted, alertMessage, alertType }}>
      <setAlertContext.Provider value={{ setShowAlert, setAlertCompleted ,setAlertMessage, setAlertType }}>
        {children}
      </setAlertContext.Provider>
    </AlertContext.Provider>
  );
};
