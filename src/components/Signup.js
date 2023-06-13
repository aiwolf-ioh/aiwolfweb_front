import React, { useState } from "react"
import { Alert, Button, Card, Container, Form, } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupFailed, setSignupFailed] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    //リクエストに付加するヘッダーの定義
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "https://aiwolf-web.herokuapp.com/api/create-user/",
        { user_name: name, email: email, password: password },
        { headers: headers }
      );
      // サインアップ成功
      if (response.status === 200) {
        setSignupFailed(false);
        navigate("/login", {
          replace: true,
          state: { message: "サインアップしました", type: "success" },
        });
      }
      // サインアップ失敗
      else {
        console.log("サインアップに失敗しました");
        setSignupFailed(true);
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
      setSignupFailed(true);
    }
  };

  return (
    <Container>
      {signupFailed ? (
        <div className="m-4">
          <Alert variant="danger">サインアップできませんでした</Alert>
        </div>
      ) : (
        <div></div>
      )}
      <Card
        className="mx-auto my-5 bg-white d-flex align-items-center justify-content-center"
        style={{ width: "26rem", height: "21rem" }}
      >
        <Card.Body>
          <Card.Title className="font-weight-normal mb-4 mt-3">
            サインアップ
          </Card.Title>
          <Form style={{ width: '18rem' }}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                placeholder="ユーザー名"
                className="rounded-pill mb-2"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="メールアドレス"
                className="rounded-pill mb-2"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="パスワード"
                className="rounded-pill mb-2"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirm-password">
              <Form.Control
                type="password"
                placeholder="パスワード(確認)"
                className="rounded-pill mb-2"
                onChange={(event) => setConfirmPassword(event.target.value)}
                isInvalid={password !== confirmPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                パスワードが一致しません
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="rounded-pill mt-3"
              onClick={handleSubmit}
            >
              登録
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signup;