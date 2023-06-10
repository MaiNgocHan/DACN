import { quizMockData } from "../../dummyData/dummyData";
import Layout from "../../layout/Layout";
import NewsCard from "../../common/NewsCard";
import classes from "./Quiz.module.css";
const Quiz = () => {
    return (
        <Layout>
        <h1 className={`mt-4 px-4 ${classes.color_green}`}>Danh sách bài trắc nghiệm</h1>
            <div className="row px-4">
                {quizMockData.map((quiz, index) => (
                    <div key={index} className="col-3">
                        <NewsCard type='quiz' item={quiz} color="green" content/>
                    </div>
                ))}
            </div>
        </Layout>
    )
};
export default Quiz;