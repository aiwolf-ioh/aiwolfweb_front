import React, { useContext, useEffect } from "react";
import { AlertContext, setAlertContext } from "../AlertContext";
import { Alert as BootstrapAlert } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Alert = () => {
  const { setShowAlert, setAlertCompleted } = useContext(setAlertContext);
  const { showAlert, alertCompleted, alertMessage, alertType } = useContext(AlertContext);
  const location = useLocation();

  // ページ遷移したらアラートを消す
  useEffect(
    () => {
      if (showAlert) {
        if (alertCompleted) {
          setShowAlert(false);
          setAlertCompleted(false);
        }
        else {
          setAlertCompleted(true);
        }
      }
    }, [location]
  );

  return (
    <div>
      {showAlert ? (
        <div className="m-4">
          <BootstrapAlert variant={alertType}>{alertMessage}</BootstrapAlert>
        </div>
      ) : (<div></div>)}
    </div>
  );
};

export default Alert;