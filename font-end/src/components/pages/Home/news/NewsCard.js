import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NewsCard.module.css';

const NewsCard = (props) => {
    const news = props.news;
    return (
        <Link className='text-decoration-none' to={`/news/${news._id}`}>
            <div className={classes.card + ' ' + classes[props.color]}>
                <img className={classes.image} src={news.image} alt="news" width='100%'></img>
                <p className={classes.word_wrap}>{news.title}</p>
                {props.content && <p className={classes.word_wrap_content}>{news.content}</p>}
            </div>
        </Link>
    )
}

export default NewsCard;