import React from "react";
import { Button, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = (props) => {
  return (
    <Container className="my-5">
      <Image src="https://storage.googleapis.com/aiwolf-analyze/img/eyecatch.png" className="img-fluid"></Image>
      <Row className="mr-auto mt-3 ml-2">
        <Button as={Link} to={props.isLoggedIn ? "/main" : "/login"} className="mx-1">メインのページへ</Button>
        <Button as={Link} to="https://power-pipe-a66.notion.site/How-to-use-AIWolf-Analyze-2d9a0452eb744d699c29126bb46330a6" className="mx-1" target="_blank" rel="noopener noreferrer">使い方はこちら</Button>
      </Row>
    </Container>
  );
};

export default HomePage;