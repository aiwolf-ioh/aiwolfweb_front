import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Main = (props) => {
  return (
    <Container className='mt-5 mb-5'>
      <Button as={Link} to={'/newdata'} className='ml-auto'>
        新規作成
      </Button>
    </Container>
  )
}

export default Main