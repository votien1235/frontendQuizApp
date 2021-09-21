import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, } from "react-bootstrap";
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
    const [authQuiz, setAuthQuiz] = useState(false)
    useEffect(() => {
        if (!authUser) {
            history.push("/")
        }
    }, [history, authUser]);
    if (!authUser) {
        return null
    }

    const fetchQuestions = async (category, difficulty) => {
        const { data } = await axios.get(
            `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
            }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
        );

        setQuestions(data.results);
    };




    return (
        <div className="hero" >
            <div>
                <Navbar expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <img src="./logoquiz.png" alt="" style={{ height: 50, borderRadius: 10 }} />
                        </Navbar.Brand>

                        <Nav className="ms-auto" as={Link} to="/profile">
                            <Avatar size="lg" src={authUser.photoUrl} />
                        </Nav>
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
                        setAuthQuiz={setAuthQuiz} />
                </Route>
            </Switch>

        </div >
    )

}