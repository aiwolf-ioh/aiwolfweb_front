import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { setAlertContext } from "../AlertContext";

const Edit = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState(null);
  const [data, setData] = useState(null);
  const [villageSize, setVillageSize] = useState(null);
  const [memo, setMemo] = useState(null);
  const [isVisibleFromLink, setIsVisibleFromLink] = useState(null);

  const { setShowAlert, setAlertMessage, setAlertType } = useContext(setAlertContext);

  const currentData = location.state ? location.state.data : null;
  
  useEffect(() => {
    if (currentData) {
      setName(currentData.name);
      setVillageSize(currentData.num_people);
      setMemo(currentData.memo);
      setIsVisibleFromLink(currentData.can_view);
    }
  }, [currentData]);

  // 登録時のファイル名を取得
  const tmp = location.state ? location.state.data.data_file.split("/").filter((item) => item.match(/.zip/))[0] : "";
  const currentFileName = tmp.substr(0, tmp.indexOf(".zip") + 4);

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

  // 更新時に呼ばれる関数
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };

      // FormData オブジェクトを作成
      const formData = new FormData();
      formData.append("name", name);
      if (data) formData.append("data_file", data); // Fileオブジェクトを追加
      formData.append("num_people", villageSize);
      formData.append("can_view", isVisibleFromLink);
      formData.append("memo", memo);
      const response = await axios.patch(
        "https://aiwolf-web.herokuapp.com/api/matchdata/" + currentData.id,
        formData,
        { headers: headers }
      );

      // データの登録成功
      if (parseInt(response.status / 100) === 2) {
        console.log("successfully edited");
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage("対戦データを変更しました");
        navigate("/main");
      }
      // 登録失敗
      else {
        console.log("edit failed");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  useEffect(() => {
    if (location.state !== undefined && !location.state) {
      navigate(`/data/${id}`, { replace: true });
    }
  }, [location.state]);

  return (
    <Container className="mx-5 my-5">
      {currentData && <div>
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
                <span>現在：<a href={currentData.data_file}>{currentFileName}</a></span>
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
        </Form>
        <Button onClick={handleSubmit} className="mx-3 my-4">
          更新
        </Button>
        <Button onClick={() => navigate(`/data/${currentData.id}`, { replace: true })} className="mx-3 my-4 btn-dark">
          キャンセル
        </Button>
      </div>}
    </Container>
  );
};

export default Edit;