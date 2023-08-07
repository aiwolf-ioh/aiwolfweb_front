import React, { useState, useEffect } from "react";
import { Button, Card, Container, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Main = (props) => {
  const itemsPerPage = 10;

  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const navigate = useNavigate();

  // Paginationのクリック
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 再レンダリングするかどうかを判断するためのもの
  const compareData = (prev, curr) => {
    if (prev === null || prev.length !== curr.length) {
      return false;
    }
    return true;
  }

  // apiから送られてくる全データ
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
        setId(id_response.data.id);
      }
      const response = await axios.get(
        "https://aiwolf-web.herokuapp.com/api/matchdata/",
        { headers: headers }
      );
      if (parseInt(response.status / 100) == 2 && !compareData(data, response.data)) {
        setData(response.data.reverse());
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
      setData(null);
    }
  }

  // 自分が作成したデータ
  const filterData = (allData) => {
    if (allData == null || allData.length === 0) {
      return;
    }
    const myData = allData.filter((item) => item.author == id);
    setMyData(myData);
    localStorage.setItem('matchData', JSON.stringify(myData));
  }

  // 日時を見やすく表示
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

  useEffect(() => {
    if (data != null) {
      filterData(data);
    }
  }, [data]);

  useEffect(() => {
    setCurrentItems(myData.slice(firstIndex, lastIndex));
    setTotalPages(Math.ceil(myData.length / itemsPerPage));
  }, [myData, currentPage]);
  
  useEffect(() => {
    const storedData = localStorage.getItem('matchData');
    if (storedData) {
      setMyData(JSON.parse(storedData));
    }
  }, []);

  fetchData();

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex">
        <Button as={Link} to={"/newdata"} className="ml-auto my-4">
          新規作成
        </Button>
      </div>
      {currentItems.map((item) => (
        <Card as={Link} to={`/data/${item.id}`} key={item.id} className="text-dark">
          <Card.Body>
          <div className="d-flex justify-content-between">
              <h5>{item.name}</h5>
              <p className="text-right small">{formatDateTime(item.created_at)}</p>
          </div>
          <p className="text-left">{item.memo}</p>
          </Card.Body>
        </Card>
      ))}
      <div className="d-flex justify-content-center py-4">
        <Pagination>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              activeLabel=""
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Container>
  )
}

export default Main