import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import authCtx from "../context/auth";
import Profile from "../component/Profile";
import { Avatar } from "../component/shared/Avatar";
import "./page.css"
import HomeQuiz from "../component/Feed/HomeQuiz/HomeQuiz";
import { Quiz } from "../component/Feed/Quiz/Quiz";
import Result from "../component/Feed/Result/Result";
import axios from "axios";



export const Main = () => {
    const history = useHistory();
    const { authUser } = useContext(authCtx);
    const [questions, setQuestions] = useState();
    const [score, setScore] = useState(0)

    const [highScore, setHighScore] = useState(0);

    const [authQuiz, setAuthQuiz] = useState(false)
    useEffect(() => {
        if (!authUser) {
            history.push("/")
        }
    }, [history, authUser]);
    if (!authUser) {
        return null
    }
    if (authUser.highestScore > 0 && authUser.highestScore > highScore) {
        setHighScore(authUser.highestScore)
    }

    const fetchQuestions = async (category, difficulty) => {
        const { data } = await axios.get(
            `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
            }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
        );

        setQuestions(data.results);
    };


    const handleLogOut = () => {
        localStorage.clear();
        history.push("/");
        window.location.reload();
    }

    return (
        <div className="hero" >
            <div>
                <Navbar expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <img src="./logoquiz.png" alt="" style={{ height: 50, borderRadius: 10 }} />
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto" >
                                <Nav.Link className="ms-auto d-flex flex-row justify-content-center" as={Link} to="/profile"><Avatar size="lg" src={authUser.AphotoUrl} /></Nav.Link>
                                <Nav.Link > <button onClick={handleLogOut} className="btn btn-outline-danger m-auto" style={{ textDecoration: "none" }}>Log Out</button>p</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                       
                    </Container>
                </Navbar>
            </div>
            <Switch >
                <Route path="/profile" component={Profile} />
                <Route path="/feed" exact>
                    <HomeQuiz user={authUser}
                        fetchQuestions={fetchQuestions}
                        authQuiz={authQuiz}
                        setAuthQuiz={setAuthQuiz}
                        highScore={highScore}
                    />
                </Route>
                <Route path="/quiz" >
                    <Quiz
                        user={authUser}
                        questions={questions}
                        score={score}
                        setScore={setScore}
                        setQuestions={setQuestions}
                        authQuiz={authQuiz}
                        setAuthQuiz={setAuthQuiz}
                    />
                </Route>
                <Route path="/result" >
                    <Result user={authUser} score={score} authQuiz={authQuiz}
                        setAuthQuiz={setAuthQuiz} highScore={highScore} setHighScore={setHighScore} />
                </Route>
            </Switch>

        </div >
    )

}