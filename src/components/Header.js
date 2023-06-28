import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from "../AuthContext";
import { setAlertContext } from "../AlertContext";


const Header = () => {
  const { logout, isLoggedIn } = useContext(AuthContext);
  const { setShowAlert, setAlertMessage, setAlertType } = useContext(setAlertContext);

  const handleLogout = () => {
    logout();
    setShowAlert(true);
    setAlertMessage("ログアウトしました");
    setAlertType("success");
  }

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
                <Nav.Link as={Link} to={isLoggedIn ? '/main' : '/'}>ホーム</Nav.Link>
                <Nav.Link as={Link} to='/news'>お知らせ</Nav.Link>
                {
                  isLoggedIn ?
                  <Nav.Link as={Link} to='/profile'>プロフィール</Nav.Link> :
                  <Nav.Link as={Link} to='/signup'>サインアップ</Nav.Link>
                }
                {
                  isLoggedIn ?
                  <Nav.Link as={Link} to='/' onClick={handleLogout}>ログアウト</Nav.Link> :
                  <Nav.Link as={Link} to='/login'>ログイン</Nav.Link>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header