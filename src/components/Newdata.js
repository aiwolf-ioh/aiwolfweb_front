import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAlertContext } from "../AlertContext";

const Newdata = (props) => {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [villageSize, setVillageSize] = useState("5");
  const [memo, setMemo] = useState("");
  const [isVisibleFromLink, setIsVisibleFromLink] = useState(false);

  const { setShowAlert, setAlertMessage, setAlertType } = useContext(setAlertContext);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDataChange = (e) => {
    const selectedFile = e.target.files[0];
    // ファイルが zip 形式であることを確認する
    if (selectedFile && selectedFile.name.split(".").pop() === "zip") {
      setData(selectedFile);
    } else {
      setData(null);
    }
  };

  const handleVillageSizeChange = (e) => {
    setVillageSize(e.target.value);
  };

  const handleMemoChange = (e) => {
    setMemo(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setIsVisibleFromLink(e.target.checked);
  };

  // 登録時に呼ばれる関数
  const handleSubmit = async (e) => {
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const id_response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/myself/",
        { headers: headers }
      );
      const id = id_response.data.id;
      // FormData オブジェクトを作成
      const formData = new FormData();
      formData.append("name", name);
      formData.append("author", id);
      formData.append("data_file", data); // Fileオブジェクトを追加
      formData.append("num_people", villageSize);
      formData.append("can_view", isVisibleFromLink);
      formData.append("memo", memo);
      const response = await axios.post(
        "https://aiwolf-web.herokuapp.com/api/matchdata/",
        formData,
        { headers: headers }
      );

      // データの登録成功
      if (parseInt(response.status / 100) == 2) {
        console.log("successfully post");
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage("対戦データを登録しました");
        navigate("/main");
      }
      // 登録失敗
      else {
        console.log("post failed");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  return (
    <Container className="mx-5 my-5">
      <Form onSubmit={handleSubmit}>
        <hr />
        <Form.Group controlId="name" className="my-3">
          <div className="row">
            <div className="col font-weight-bold">
              <Form.Label>対戦名：</Form.Label>
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
        <Form.Group controlId="data" className="my-3">
          <div className="row">
            <div className="col font-weight-bold">
              <Form.Label>対戦データ：</Form.Label>
            </div>
            <div className="col">
              <Form.Control
                type="file"
                accept=".zip"
                onChange={handleDataChange}
                required
              />
            </div>
          </div>
        </Form.Group>
        <hr />
        <Form.Group controlId="villageSize" className="my-3">
          <div className="row">
            <div className="col font-weight-bold">
              <Form.Label>村の人数：</Form.Label>
            </div>
            <div className="col">
              <Form.Control
                as="select"
                value={villageSize}
                onChange={handleVillageSizeChange}
                required
              >
                <option value="5">5</option>
                <option value="15">15</option>
              </Form.Control>
            </div>
          </div>
        </Form.Group>
        <hr />
        <Form.Group controlId="memo" className="my-3">
          <div className="row">
            <div className="col font-weight-bold">
              <Form.Label>メモ：</Form.Label>
            </div>
            <div className="col">
              <Form.Control
                as="textarea"
                value={memo}
                onChange={handleMemoChange}
              />
            </div>
          </div>
        </Form.Group>
        <hr />
        <Form.Group controlId="Visibility" className="my-3">
          <div className="row">
            <div className="col font-weight-bold">
              <Form.Label>リンクで共有可能にする：</Form.Label>
            </div>
            <div className="col">
              <Form.Check
                type="checkbox"
                checked={isVisibleFromLink}
                onChange={handleVisibilityChange}
              />
            </div>
          </div>
        </Form.Group>
        <hr align="center" />
        <Button variant="primary" type="submit">
          作成
        </Button>
      </Form>
    </Container>
  );
};

export default Newdata;