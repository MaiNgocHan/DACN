import { useState } from "react";
import { quizMockData } from "../../dummyData/dummyData";
import Layout from "../../layout/Layout";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../../common/CountdownTimer ";
import classes from './QuizTemplate.module.css';

const QuizTemplate = (props) => {
    const testQuestions = quizMockData.find(test => test._id === props.id);
    const numberQuestions = testQuestions.questions.length;
    const [checkList, setCheckList] = useState([]);
    const navigate = useNavigate();
    const [correctResult, setCorrectResult] = useState(0);
    const [scoreResult, setScorceResult] = useState(0);
    const handleOptionChange = (questionIndex, event) => {
        const newList = [...checkList];
        newList[questionIndex] = event.target.value;
        setCheckList(newList);
    }
    const [showResult, setShowResult] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        let newCorrectResult = 0;
        for ( let i = 0; i < numberQuestions; i++){
            if(testQuestions.results[i] === checkList[i]){
                newCorrectResult++;
            }
        }
        let newScoreResult = newCorrectResult / numberQuestions * 10;
        setCorrectResult(newCorrectResult);
        setScorceResult(newScoreResult);
        setShowResult(true);
    }
    const timeUp = () => {
        let newCorrectResult = 0;
        for ( let i = 0; i < numberQuestions; i++){
            if(testQuestions.results[i] === checkList[i]){
                newCorrectResult++;
            }
        }
        let newScoreResult = newCorrectResult / numberQuestions * 10;
        setCorrectResult(newCorrectResult);
        setScorceResult(newScoreResult);
        setShowResult(true);
    }
    const handleClose = () => {
        setShowResult(false);
        navigate("/quiz");
    }
    const back = () => {
        navigate("/quiz");
    }
    return (
        <Layout props={{footer: false}}>
            <div className="my-3 px-5">
                <h1> Bài kiểm tra</h1>
                <div className={classes.countTime}>
                    <CountdownTimer targetMinutes={1} timeUp={timeUp}/>
                </div>
                <h3>{testQuestions.title}</h3>
                <h5 className="mb-5">{testQuestions.content}</h5>
                <form onSubmit={handleSubmit}>
                {testQuestions.questions.map((quiz, index) => (
                    <div key={index}>
                        <h4>{quiz.question}</h4>
                        <div className="row">
                            {quiz.options.map((option, answerIndex) => (
                                <div className="form-check" key={option.value}>
                                    <input
                                        type="radio"
                                        id={`option${option.value}`}
                                        value={option.value}
                                        onChange={(event) => handleOptionChange(index, event)}
                                        className="form-check-input mx-3"
                                        checked={option.value === checkList[index]}
                                    />
                                    <label htmlFor={`option${option.value}`} className="form-check-label">
                                        {option.content}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="d-flex">
                    <Button type="button" className="my-5 py-2 px-4" variant="danger" onClick={back}>Quay về</Button>
                    <Button type="submit" className="my-5 ms-auto py-2 px-4" variant="success">Nộp bài</Button>
                </div>
                </form>
            </div>
            <Modal show={showResult} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Bạn đã hoàn thành bài kiểm tra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Đây là kết quả của bạn</p>
                    <p>Số câu trả lời đúng: {correctResult}/{numberQuestions}</p>
                    <p>Điểm của bạn: {scoreResult}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Quay về
                </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
};

export default QuizTemplate;