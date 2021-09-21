import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Result.css";
import axios from "../../../utils/axios";

const Result = ({ user, score, authQuiz, setAuthQuiz }) => {
    const history = useHistory();

    useEffect(() => {
        if (authQuiz === false) {
            history.push("/")
        }
    }, [authQuiz, history])


    const handleClickSetHighScore = async (event) => {
        event.preventDefault();
        if (score > user.highestScore) {
            await axios.put("/auth/me/uploadhighscore", { highestScore: `${score}` });
            setAuthQuiz(false)
        } else { setAuthQuiz(false) }

    }
    return (
        <div className="resultQuiz">
            <span className="title">Final Score : {score}</span>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ alignSelf: "center", marginTop: 20 }}
                onClick={handleClickSetHighScore}
            >
                Go to homepage
            </Button>
        </div>
    );
};

export default Result;