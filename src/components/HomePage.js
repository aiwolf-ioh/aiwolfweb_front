import React from 'react'
import { Button, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const HomePage = (props) => {
    return (
        <Container className='mt-5 mb-5'>
            <Image src='https://storage.googleapis.com/aiwolf-analyze/img/eyecatch.png' className='img-fluid'></Image>
            <Row className='mr-auto mt-3 ml-2'>
                <Button as={Link} to={ props.isLoggedIn ? '/main' : '/login' } className='mx-1'>メインのページへ</Button>
                <Button as={Link} to='/howto' className='mx-1'>使い方はこちら</Button>
            </Row>
        </Container>
    )
}

export default HomePage