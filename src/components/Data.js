import React, { useContext, useState, useEffect } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "./DataTable";
import { setAlertContext } from "../AlertContext";

const Data = (props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [data, setData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [uneditable, setUneditable] = useState(false);
  const [message, setMessage] = useState("");
  const [inVisible, setInvisible] = useState(false);
  const { id } = useParams();

  const { setShowAlert, setAlertMessage, setAlertType } = useContext(setAlertContext);

  const fetchData = async () => {
    if (!props.token) return;
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const id_response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/myself/",
        { headers: headers }
      );
      if (parseInt(id_response.status / 100) == 2) {
        setUserId(id_response.data.id);
      }
      const response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/matchdata/" + id,
        { headers: headers }
      );
      if (parseInt(response.status / 100) == 2) {
        setData(response.data);
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  }

  const formatDateTime = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const formattedDateTime = `${year}年${month}月${day}日${hours}:${minutes}`;
    return formattedDateTime;
  }

  // 編集ボタンが押されたとき
  const handleEdit = () => {
    if (userId === data.author) {
      navigate(`/edit/${id}`, {state: { data: data }});
    } else {
      setUneditable(true);
      setMessage("編集");
    }
  }

  // 削除ボタンが押されたとき
  const handleDeletePressed = () => {
    if (userId === data.author) {
      setShowConfirmation(true);
    } else {
      setUneditable(true);
      setMessage("削除");
    }
  }

  // 削除するとき
  const handleDelete = async () => {
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const response = await axios.delete(
        "https://aiwolf-web.herokuapp.com/api/matchdata/" + id,
        { headers: headers }
      );
      if (parseInt(response.status / 100) == 2) {
        setAlertType("warning");
        setAlertMessage(`試合データ${data.name}を削除しました`);
        setShowAlert(true);
        navigate("/main", { replace: true });
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [props.token]);

  useEffect(() => {
    if (data && userId !== data.author && !data.can_view) {
      setInvisible(true);
    }
  }, [userId, data]);

  return (
    <Container className="mx-5 my-5">
      {inVisible ?
      (<div>
        このデータへのアクセスが許可されていません
      </div>):(<div>
      {showConfirmation ? 
      (<div>
        <h4 className="my-4">本当に削除しますか？</h4>
        <Button onClick={handleDelete} className="mx-3 btn-danger">削除</Button>
        <Button onClick={() => setShowConfirmation(false)} className="mx-3 btn-dark">キャンセル</Button>
      </div>
      ) : (
        <div>
          {uneditable && <Alert variant="warning">他の人のデータは{message}できません</Alert>}
          <div className="d-flex"><Button as={Link} to="/main" className="my-3 mr-auto">試合リストに戻る</Button></div>
          {data && data.analyzed_data &&
          <div>
            <Table>
              <tbody>
                <tr>
                  <th>タイトル</th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>作成日時</th>
                  <td>{formatDateTime(data.created_at)}</td>
                </tr>
                <tr>
                  <th>ログデータ</th>
                  <td><a href={data.data_file}>ダウンロード</a></td>
                </tr>
                <tr>
                  <th>メモ</th>
                  <td>{data.memo}</td>
                </tr>
                <tr>
                  <th>勝率</th>
                  <td><DataTable type="win" data={data.analyzed_data} /></td>
                </tr>
                <tr>
                  <th>生存率</th>
                  <td><DataTable type="alive" data={data.analyzed_data} /></td>
                </tr>
                <tr>
                  <th>襲撃成功率</th>
                  <td><DataTable type="attack" data={data.analyzed_data} /></td>
                </tr>
                <tr>
                  <th>占い的中率</th>
                  <td><DataTable type="divine" data={data.analyzed_data} /></td>
                </tr>
                <tr>
                  <th>護衛成功率</th>
                  <td><DataTable type="guard" data={data.analyzed_data} /></td>
                </tr>
              </tbody>
            </Table>
            <Button onClick={handleEdit} className="mx-3 my-4">
            編集
            </Button>
            <Button onClick={() => handleDeletePressed(true)} className="mx-3 my-4 btn-dark">
              削除
            </Button>
          </div>
          }
        </div>)    
      }</div>)}
    </Container>
  )
};

export default Data;