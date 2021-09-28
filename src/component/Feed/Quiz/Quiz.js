import React, { useEffect, useState } from "react";
import Question from "../../Question.js/Question";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

import "./Quiz.css"


export const Quiz = ({ user, questions, score, setScore, setQuestions, setAuthQuiz, authQuiz }) => {
    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);
    const history = useHistory();
    useEffect(() => {
        setOptions(
            questions &&
            handleShuffle([
                questions[currQues]?.correct_answer,
                ...questions[currQues]?.incorrect_answers,
            ])
        );
    }, [currQues, questions]);
    useEffect(() => {
        if (authQuiz === false) {
            history.push("/")
        }
    }, [authQuiz, history])


    const handleShuffle = (optionss) => {
        return optionss.sort(() => Math.random() - 0.5);
    };

    return (
        <div className="quizBody">
            <span className="subtitle">Welcome: {user.displayName ? user.displayName : user.username}</span>

            {questions ? (
                <>
                    <div className="quizInfo">
                        <span>{questions[currQues].category}</span>
                        <span>
                            Score : {score}
                        </span>
                    </div>
                    <Question
                        currQues={currQues}
                        setCurrQues={setCurrQues}
                        questions={questions}
                        options={options}
                        correct={questions[currQues]?.correct_answer}
                        score={score}
                        setScore={setScore}
                        setQuestions={setQuestions}
                        setAuthQuiz={setAuthQuiz}
                        authQuiz={authQuiz}
                    />
                </>
            ) : (
                <CircularProgress
                    style={{ margin: 100 }}
                    color="inherit"
                    size={150}
                    thickness={1}
                />
            )}
        </div>
    )
}