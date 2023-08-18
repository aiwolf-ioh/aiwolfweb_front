import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

const Comment = (props) => {
  const dataId = props.id;
  const userId = props.userId;
  const [comments, setComments] = useState(null);
  const [users, setUsers] = useState(null);
  const [newComment, setNewComment] = useState("");

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const comment_response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/comment/",
        { headers: headers }
      );
      if (parseInt(comment_response.status / 100) === 2) {
        const filteredComments = comment_response.data.filter((item) => item.match_data === dataId);
        setComments(filteredComments);
      }
      const user_response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/user/",
        { headers: headers }
      );
      if (parseInt(user_response.status / 100) === 2) {
        const userIdMap = {};
        user_response.data.forEach((item) => {
          userIdMap[item.id] = item.user_name;
        });
        setUsers(userIdMap);
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  // 日時を見やすく表示
  const formatDateTime = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const formattedDateTime = `${year}年${month}月${day}日${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    return formattedDateTime;
  };

  // 入力されたコメントを記録
  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // コメントを投稿
  const handlePost = async () => {
    try {
      const headers = {
        Authorization: `Token ${props.token}`,
      };
      const response = await axios.post(
        "https://aiwolf-web.herokuapp.com/api/comment/",
        { author: userId, content: newComment, match_data: dataId },
        { headers: headers }
      );
      if (parseInt(response.status / 100) === 2) {
        setNewComment("");
        fetchData();
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.token]);

  return (
    <div>
      {comments && users &&
        <Card>
          <Card.Body className="d-flex align-items-center flex-column">
            <Card.Title style={{ width: "100%" }} className="text-left">コメント</Card.Title>
            <hr style={{ width: "100%" }} />
            {comments.length === 0 ? (
              <div style={{ width: "100%" }} className="text-left">
                <div className="my-3">コメントはありません</div>
                <hr />
              </div>
            ) : (
              <div style={{ width: "90%" }}>
                {comments.map((item) => (
                  <div key={item.id}>
                    <div className="d-flex justify-content-between">
                      <h5>{users[item.author] ? users[item.author] : "anonymous"}</h5>
                      <p className="text-right small">{formatDateTime(item.created_at)}</p>
                    </div>
                    <p className="text-left">{item.content}</p>
                    <hr />
                  </div>
                ))}
              </div>
            )}
            <Card style={{ width: "80%" }} className="text-left mt-5 mb-4">
              <Card.Body>
                <h5 className="font-weight-normal">投稿する</h5>
                <div><textarea style={{ width: "100%" }} value={newComment} placeholder="コメントを入力" onChange={handleNewCommentChange} /></div>
                <Button className="mt-2" onClick={handlePost}>投稿</Button>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      }
    </div>
  );
};

export default Comment;