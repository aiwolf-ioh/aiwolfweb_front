import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
        {/* <Navbar.Brand href='/'>KojoBarbie's Port Folio</Navbar.Brand> */}
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
                <Nav.Link href='/'>ホーム</Nav.Link>
                <Nav.Link href='/news'>お知らせ</Nav.Link>
                <Nav.Link href='/signup'>サインアップ</Nav.Link>
                <Nav.Link href='/login'>ログイン</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header