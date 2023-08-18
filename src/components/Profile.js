import React, { useState, useEffect } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = (props) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/myself/",
        { headers: headers }
      );
      if (parseInt(response.status / 100) === 2) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  useEffect(() => { if (props.token) fetchData() }, [props.token]);

  useEffect(() => {
    if (props.isLoggedIn !== undefined && !props.isLoggedIn) {
      navigate("/login", { state: { to: "/profile" } });
    }
  }, [props.isLoggedIn]);

  return (
    <Container>
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
        </Card.Body>
      </Card>}
    </Container>
  );
};

export default Profile;