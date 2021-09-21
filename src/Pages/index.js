import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Route, Link, useHistory } from "react-router-dom";
import { SignIn } from "../component/Auth/SignIn";
import { SignUp } from "../component/Auth/SignUp";
import authCtx from "../context/auth";

export const Auth = () => {
    const { authUser } = useContext(authCtx);
    const history = useHistory();

    useEffect(() => {
        if (authUser) {
            history.push("/feed");
        }
    }, [authUser, history])

    return (
        <div className="hero" >
            <Container >
                <div className="h-100 pt-3">
                    <div className="text-center mb-3">
                        <Link to="/">
                            <img src="/logoquiz.png" alt="" className="logo" />
                        </Link>
                    </div>
                    <div>
                        <Row>
                            <Col xs={12} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }}>
                                <Route path="/auth/sign-up" component={SignUp} />
                                <Route path="/auth/sign-in" component={SignIn} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    )
}

