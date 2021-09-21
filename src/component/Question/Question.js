import { Button } from "@material-ui/core";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import "./Question.css";


const Question = ({
    currQues,
    setCurrQues,
    questions,
    options,
    correct,
    setScore,
    score,
    setQuestions,
    authQuiz, setAuthQuiz
}) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);

    const history = useHistory();

    const handleSelect = (i) => {
        if (selected === i && selected === correct) return "select";
        else if (selected === i && selected !== correct) return "wrong";
        else if (i === correct) return "select";
    };

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) setScore(score + 1);
        setError(false);
    };

    const handleNext = () => {
        if (currQues > 8) {
            history.push("/result");
        } else if (selected) {
            setCurrQues(currQues + 1);
            setSelected();
        } else setError("Please select an option first");
    };

    const handleQuit = () => {
        setCurrQues(0);
        setQuestions();
    };

    return (
        <div className="question">
            <h1>Question {currQues + 1} :</h1>

            <div className="singleQuestion">
                <div className="questionstyle">{questions[currQues].question}</div>
                <div className="options">
                    {error && <Alert style={{ padding: 0, margin: 0 }}>{error}</Alert>}
                    {options &&
                        options.map((i) => (
                            <button
                                className={`singleOption  ${selected && handleSelect(i)}`}
                                key={i}
                                onClick={() => handleCheck(i)}
                                disabled={selected}
                            >
                                {i}
                            </button>
                        ))}
                </div>
                <div className="controls">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        style={{ width: 185 }}
                        href="/"
                        onClick={() => handleQuit()}
                    >
                        Quit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ width: 185 }}
                        onClick={handleNext}
                    >
                        {currQues > 20 ? "Submit" : "Next Question"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Question;