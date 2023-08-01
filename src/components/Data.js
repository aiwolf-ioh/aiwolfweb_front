import React, { useState, useEffect } from "react";
import { Button, Card, Container, Pagination } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Data = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    console.log(location.state)
    console.log(props.token)
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
        console.log(data);
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
};

export default Data;