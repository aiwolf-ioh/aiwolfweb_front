import React, { useContext, useEffect } from "react";
import { AlertContext, setAlertContext } from "../AlertContext";
import { Alert as BootstrapAlert } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Alert = () => {
  const { setShowAlert, setAlertCompleted, setAlertMessage, setAlertType } = useContext(setAlertContext);
  const { showAlert, alertCompleted, alertMessage, alertType } = useContext(AlertContext);
  const location = useLocation();
  var message = "", type = "";
  /*
  useEffect(
    () => {
      setShowAlert(false);
      setAlertMessage("");
      setAlertType("");
    }
  )
  */
  useEffect(
    () => {
      if (showAlert) {
        if (alertCompleted) {
          setShowAlert(false);
          setAlertCompleted(true);
        }
        else {
          setAlertCompleted(true);
        }
      }
    }, [location]
  );

  if (showAlert) {
    message = alertMessage;
    type = alertType;
    return (
      <div className="m-4">
        <BootstrapAlert variant={type}>{message}</BootstrapAlert>
      </div>
    );
  }
  else {
    return (<div></div>);
  }
}

export default Alert;