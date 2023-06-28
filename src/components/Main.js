import React, { useContext } from 'react'
import { Button, Container, Image, Row } from 'react-bootstrap'
import { AuthContext } from "../AuthContext";

const Main = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Container className='mt-5 mb-5'>
            
        </Container>
    )
}

export default Main