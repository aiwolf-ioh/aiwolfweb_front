import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setAlertContext } from "../AlertContext";


const Header = (props) => {
  const { setShowAlert, setAlertMessage, setAlertType } = useContext(setAlertContext);

  const handleLogout = () => {
    props.onLogout();
    setShowAlert(true);
    setAlertMessage("ログアウトしました");
    setAlertType("success");
  }

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
                <Nav.Link as={Link} to={props.isLoggedIn ? '/main' : '/'}>ホーム</Nav.Link>
                <Nav.Link as={Link} to='/news'>お知らせ</Nav.Link>
                {
                  props.isLoggedIn ?
                  <Nav.Link as={Link} to='/profile'>プロフィール</Nav.Link> :
                  <Nav.Link as={Link} to='/signup'>サインアップ</Nav.Link>
                }
                {
                  props.isLoggedIn ?
                  <Nav.Link as={Link} to='/' onClick={handleLogout}>ログアウト</Nav.Link> :
                  <Nav.Link as={Link} to='/login'>ログイン</Nav.Link>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header