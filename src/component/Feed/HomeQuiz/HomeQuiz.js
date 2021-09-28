import { Button, MenuItem, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import { Alert } from 'react-bootstrap'

import Categories from "../../../Data/Categories";
import "./HomeQuiz.css";

const HomeQuiz = ({ user, fetchQuestions, setAuthQuiz, highScore }) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);
    const history = useHistory();
    const handleSubmit = () => {

        if (!category || !difficulty) {
            setAuthQuiz(false)
            setError(true);
            return;
        } else {
            setError(false);
            fetchQuestions(category, difficulty);
            setAuthQuiz(true)
            history.push("/quiz");
        }
    };


    return (
        <div className="app">
            <div className="title">quiz app</div>
            <div className="content">
                <div className="settings">

                    <span className="fontt">Quiz Settings</span>
                    <div className="settings__select">
                        <div className="nameScore">
                            <div>Wellcome!!!!!</div>
                            <div>High score: {highScore}</div>
                        </div>
                        {error && <Alert variant="danger" style={{ textAlign: "center" }}>Please fill the all Fields</Alert>}
                        <TextField
                            select
                            className="mb10 font30"
                            label="Select Category"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                                setError(false)
                            }}
                            variant="filled"

                        >
                            {Categories.map((cat) => (
                                <MenuItem key={cat.category} value={cat.value}>
                                    {cat.category}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Select Difficulty"
                            value={difficulty}
                            className="mb10 font30"
                            onChange={(e) => {
                                setDifficulty(e.target.value)
                                setError(false)
                            }}
                            variant="filled"

                        >
                            <MenuItem key="Easy" value="easy">
                                Easy
                            </MenuItem>
                            <MenuItem key="Medium" value="medium">
                                Medium
                            </MenuItem>
                            <MenuItem key="Hard" value="hard">
                                Hard
                            </MenuItem>
                        </TextField>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSubmit}
                        >
                            Start Quiz
                        </Button>
                    </div>
                </div>
                <img src="/quiz.svg" className="banner" alt="quiz app" />
            </div >
        </div>
    );
};

export default HomeQuiz;