import Layout from "../../../layout/Layout";
// import { useParams } from "react-router-dom";
import classes from './NewsDetail.module.css';
// import { getNewsDetail } from '../../../api/newsApi';

const NewsDetail = (props) => {
    const news = props.news;
    // const { _id } = useParams();

    // const article = getNewsDetail(_id);
    return (
        <Layout props={{type: 'detail'}}>
            <img className={classes.image} src={news.image} alt=""/>
            <h1 className="text-center mt-5">{news.title}</h1>
            {/* <p className="mt-3 fs-5">{news.content}</p> */}
            <div className={classes.content}>
                {news.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
                ))}
            </div>
        </Layout>
    )
};

export default NewsDetail;