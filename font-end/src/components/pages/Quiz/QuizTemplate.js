import { useState } from "react";
import { quizMockData } from "../../dummyData/dummyData";
import Layout from "../../layout/Layout";

const QuizTemplate = () => {
    const {checkList, setCheckList} = useState(new Array(quizMockData[0].length));

    const handleOptionChange = (questionIndex, event) => {
        console.log(checkList);
        const updatedCheckList = [...checkList];
        updatedCheckList[questionIndex] = event.prevent.value;
        setCheckList(updatedCheckList);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <Layout props={{footer: false}}>
            <h1> Bài kiểm tra</h1>
            <form onSubmit={handleSubmit}>
            {quizMockData[0].questions.map((quiz, index) => (
                <div key={index}>
                    <h4>{quiz.question}</h4>
                    <div className="row">
                        {quiz.options.map((option) => (
                            <div className="form-check" key={option.value}>
                            <input
                                type="radio"
                                id={`option${option.value}`}
                                value={option.value}
                                checked={checkList && option.value === checkList[index]}
                                onChange={(event) => handleOptionChange(index, event)}
                                className="form-check-input"
                            />
                            <label htmlFor={`option${option.value}`} className="form-check-label">
                                {option.content}
                            </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            </form>
        </Layout>
    )
};

export default QuizTemplate;