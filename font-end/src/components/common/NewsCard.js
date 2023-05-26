import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NewsCard.module.css';

const NewsCard = (props) => {
    const item = props.item;
    return (
        <Link className='text-decoration-none' to={props.type === 'news' ? `/news/${item._id}` : `/quiz/${item._id}`}>
            <div className={classes.card + ' ' + classes[props.color]}>
                <img className={classes.image} src={item.image} alt="item_image" width='100%'></img>
                <p className={classes.word_wrap}>{item.title}</p>
                {props.content && <p className={classes.word_wrap_content}>{item.content}</p>}
            </div>
        </Link>
    )
}

export default NewsCard;