import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./page.css";
import authCtx from "../context/auth";

export const Home = () => {

    const { authUser } = useContext(authCtx);

    const history = useHistory();
    const handleSignInClick = () => {
        history.push("/auth/sign-in")
    }

    // Khi nguời dùng đã đăng nhập đẩy hết về trang feed
    useEffect(() => {
        if (authUser) {
            history.push("/feed");
        }
    }, [authUser, history])

    return (
        <div className="hero " >
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="./logoquiz.png" alt="" className="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto" >
                            <Nav.Link style={{ margin: "inherit" }} as={Link} to="/auth/sign-in">Sign in</Nav.Link>
                            <Nav.Link style={{ margin: "inherit" }} as={Link} to="/auth/sign-up">Sign up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{ padding: 80 }}>
                <Container className="d-flex h-100 align-items-center justify-content-center">
                    <div>
                        <h1>QUIZ for fun</h1>
                        <p>For everyone</p>
                        <p><small className="fst-italic"> Made by MrT with ❤️</small></p>
                        <div className="mb-2">
                            <Button variant="primary" className="me-3 rounded-pill" style={{ width: 200 }} onClick={handleSignInClick}>Sign in</Button>
                        </div>
                        <p className="small">Don't have account? <Link to="/auth/sign-up">Sign up</Link>  now</p>
                    </div>
                </Container>
            </div>
        </div >
    )
}