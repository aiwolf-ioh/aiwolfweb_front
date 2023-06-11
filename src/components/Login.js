import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

const Login = ({ location }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login } = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  // 送信したときに呼ばれる関数
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("mail:%s", email);
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
        login();
        setLoginFailed(false);
        console.log("successfully logged in");
        navigate("/app", {
          replace: true,
          state: { message: "ログインしました", type: "success" },
        });
      }
      // ログイン失敗
      else {
        console.log("wrong password");
        setLoginFailed(true);
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
      setLoginFailed(true);
    }
  };

  return (
    <Container>
      {location &&
      location.state &&
      location.state.message &&
      location.state.type ? (
        <div className="m-4">
          <Alert variant={location.state.type}>{location.state.message}</Alert>
        </div>
      ) : (
        <div></div>
      )}
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
          <Card.Title className="font-weight-normal mb-4 mt-3">
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
      </Card>
    </Container>
  );
};

export default Login;
