import React from 'react'
import { Button, Container, Image, Row } from 'react-bootstrap'

const HomePage = () => {
    return (
        <Container className='mt-5 mb-5'>
            <Image src='https://storage.googleapis.com/aiwolf-analyze/img/eyecatch.png' className='img-fluid'></Image>
            <Row className='mr-auto mt-3 ml-2'>
                <Button href='/app' className='mx-1'>メインのページへ</Button>
                <Button href='/howto' className='mx-1'>使い方はこちら</Button>
            </Row>
        </Container>
    )
}

export default HomePage