import React, { useState, useEffect } from "react";
import { Alert, /*Button,*/ Card, Container, /*Form,*/ Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = (props) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  /*
  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleCancel = () => {
    setEdit(false);
    setName(profile.user_name);
    setEmail(profile.email);
  }
  const handleEdit = async () => {
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const response = await axios.put(
        "https://aiwolf-web.herokuapp.com/api/user/",
        { id: profile.id, user_name: name, email: email },
        { headers: headers }
      );
      if (parseInt(response.status / 100) == 2) {
        setEdit(false);
        setEditCompleted(true);
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  }
  */
  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/myself/",
        { headers: headers }
      );
      if (parseInt(response.status / 100) == 2) {
        setProfile(response.data);
        setName(response.data.user_name);
        setEmail(response.data.email);
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  useEffect(() => { if (props.token) fetchData() }, [props.token]);

  useEffect(() => {
    if (props.isLoggedIn !== undefined && !props.isLoggedIn) {
      navigate("/login", {state: { to: "/profile" }});
    }
  }, [props.isLoggedIn]);

  return (
    <Container>
      {editCompleted && <Alert variant="success">プロフィールを更新しました</Alert>}
      {edit ? <div>{/*(<Card
          className="mx-auto my-5 bg-white d-flex align-items-center justify-content-center"
          style={{ width: "26rem" }}
        >
          <Card.Body>
            <Card.Title className="font-weight-normal mb-4 mt-3">
              プロフィール
            </Card.Title>
            <Form>
              <hr />
                <Form.Group controlId="name" className="my-3">
                  <div className="row">
                    <div className="col font-weight-bold d-flex align-items-center justify-content-center">
                      <Form.Label>名前</Form.Label>
                    </div>
                    <div className="col">
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                  </div>
                </Form.Group>
              <hr />
                <Form.Group controlId="email" className="my-3">
                  <div className="row">
                    <div className="col font-weight-bold d-flex align-items-center justify-content-center">
                      <Form.Label>メールアドレス</Form.Label>
                    </div>
                    <div className="col">
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                  </div>
                </Form.Group>
            </Form>
            <Button onClick={handleCancel} className="mx-3 btn-dark">キャンセル</Button>
            <Button onClick={handleEdit} className="mx-3">登録</Button>
          </Card.Body>
        </Card>)*/}</div> : (<div>
        {profile && <Card
          className="mx-auto my-5 bg-white d-flex align-items-center justify-content-center"
          style={{ width: "26rem" }}
        >
          <Card.Body>
            <Card.Title className="font-weight-normal mb-4 mt-3">
              プロフィール
            </Card.Title>
            <Table>
              <tbody>
                <tr>
                  <th>名前</th>
                  <td>{profile.user_name}</td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td>{profile.email}</td>
                </tr>
              </tbody>
            </Table>
            {/*<Button onClick={() => {setEdit(true); setEditCompleted(false)}}>編集</Button>*/}
          </Card.Body>
        </Card>}
      </div>)
      }
    </Container>
  );
};

export default Profile;