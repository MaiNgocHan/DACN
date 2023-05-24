import React from 'react';
import { Link } from 'react-router-dom';
import classes from './SmallCard.module.css';

const SmallCard = (props) => {
    const news = props.news;
    return (
        <Link className={classes.card + ' d-flex'} to={`/news/${news._id}`}>
            <p>{news.title}</p>
            <img src={news.image} alt="news" width='40%'></img>
        </Link>
    )
}

export default SmallCard;