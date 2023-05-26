import React from 'react';
import classes from './Room.module.css';
import Layout from "../../layout/Layout";

const Room = () => {

    const handleButtonClick = () => {
        window.open('http://127.0.0.1:3030/', '_blank');
    };

    return (
        <Layout>
            <div className={classes.container_room}>
                <div className={classes.content}>
                    <div className={classes.img_meet}></div>
                    <h1>Tạo phòng họp và kết nối với mọi người</h1>
                    <button onClick={handleButtonClick}>Tạo phòng họp</button>
                </div>
            </div>
        </Layout>
    );
};

export default Room;
