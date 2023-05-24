import React from "react";
import { Container } from "react-bootstrap";
import classes from './HotNews.module.css';
import NewsCard from "./NewsCard";
import SmallCard from "./SmallCard";

const HowNews = (props) => {
    return (
        <Container className={classes.container}>
            <div className="row">
                <div className="col-5">
                    <NewsCard news={props.news[0]} color="blue" content="true"/>
                </div>
                <div className="col-3">
                    <div>
                        <NewsCard news={props.news[1]} color="blue"/>
                    </div>
                    <div className="mt-4">
                        <NewsCard news={props.news[2]} color="blue"/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="mt-3"><SmallCard news={props.news[3]}/></div>
                    <div className="mt-3"><SmallCard news={props.news[4]}/></div>
                    <div className="mt-3"><SmallCard news={props.news[5]}/></div>
                    <div className="mt-3"><SmallCard news={props.news[6]}/></div>
                </div>
            </div>
        </Container>
    )
};

export default HowNews;