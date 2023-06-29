import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { setAlertContext, AlertContext } from "../AlertContext";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowAlert, setAlertMessage, setAlertType } = useContext(setAlertContext);
  const { showAlert } = useContext(AlertContext);
  const [loginFailed, setLoginFailed] = useState(false);

  // 送信したときに呼ばれる関数
  const handleSubmit = async (event) => {
    event.preventDefault();
    //リクエストに付加するヘッダーの定義
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "https://aiwolf-web.herokuapp.com/auth/",
        { username: email, password: password },
        { headers: headers }
      );

      // ログイン成功
      if (response.status === 200) {
        props.onLogin(response.data.token);
        console.log(props.isLoggedIn);
        setLoginFailed(false);
        console.log("successfully logged in");
        setShowAlert(true);
        console.log(showAlert);
        setAlertType("success");
        setAlertMessage("ログインしました");
        navigate("/main", { replace: true });
      }
      // ログイン失敗
      else {
        console.log("wrong password");
        setLoginFailed(true);
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage("ログインしました");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
      setLoginFailed(true);
    }
  };
  return (
    <Container>
      {loginFailed ? (
        <div className="m-4">
          <Alert variant="danger">ログインできませんでした</Alert>
        </div>
      ) : (
        <div></div>
      )}
      <Card
        className="mx-auto my-5 bg-white d-flex align-items-center justify-content-center"
        style={{ width: "26rem", height: "16rem" }}
      >
        <Card.Body>
          <Card.Title className="font-weight-normal mt-3">
            ログイン
          </Card.Title>
          <Form style={{ width: "18rem" }}>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="メールアドレス"
                className="rounded-pill mt-2 mb-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="パスワード"
                className="rounded-pill mt-2 mb-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              className="rounded-pill mt-3"
            >
              ログイン
            </Button>
          </Form>
        </Card.Body>
        <a href="/signup" className="mb-4">
        利用が初めての方はこちら
        </a>
      </Card>
    </Container>
  );
};

export default Login;
