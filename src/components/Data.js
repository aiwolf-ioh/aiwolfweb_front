import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DataTable from "./DataTable";
import { setAlertContext } from "../AlertContext";

const Data = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { setShowAlert, setAlertMessage, setAlertType } = useContext(setAlertContext);

  const fetchData = async () => {
    if (!props.token) return;
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/matchdata/" + location.state.id,
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

  const handleDelete = async () => {
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const response = await axios.delete(
        "https://aiwolf-web.herokuapp.com/api/matchdata/" + location.state.id,
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

  return (
    <Container className="mx-5 my-5">
      {showConfirmation ? 
      (<div>
        <h4 className="my-4">本当に削除しますか？</h4>
        <Button onClick={handleDelete} className="mx-3 btn-danger">削除</Button>
        <Button onClick={() => setShowConfirmation(false)} className="mx-3 btn-dark">キャンセル</Button>
      </div>
      ) : (
        <div>
          {data && data.analyzed_data &&
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
          }
          <Button as={Link} to={"/edit"} state={{ id: location.state.id }} className="mx-3 my-4">
            編集
          </Button>
          <Button onClick={() => setShowConfirmation(true)} className="mx-3 my-4 btn-dark">
            削除
          </Button>
        </div>)    
      }
    </Container>
  )
};

export default Data;