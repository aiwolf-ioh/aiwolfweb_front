import React from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';

const Login = () => {
    return (
        <Container>
            <Card className='mx-auto my-5 bg-white d-flex align-items-center justify-content-center' style={{ width: '26rem', height: '16rem' }}>
                <Card.Body>
                    <Card.Title className='font-weight-normal mb-4 mt-3'>ログイン</Card.Title>
                    <Form style={{ width: '18rem' }}>
                        <Form.Group controlId='email'>
                            <Form.Control type='email' placeholder='メールアドレス' className='rounded-pill mt-2 mb-2' required />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Control type='password' placeholder='パスワード' className='rounded-pill mt-2 mb-2' requierd />
                        </Form.Group>
                        <Button variant='primary' type='submit' className='rounded-pill mt-3'>
                            ログイン
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;