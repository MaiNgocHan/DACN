import React, { useCallback, useEffect , useState} from 'react';
import classes from './Home.module.css';
import NewsCard from './news/NewsCard';
import MyPagination from "../../common/MyPagination";

import chaomung from '../../assets/image/chaomung.png';
// import HotNews from './news/HotNews';
import Layout from '../../layout/Layout';
import { getNews } from '../../../api/newsApi';
const Home = () => {
    const [newsList, setNewsList] = useState([]);
    const [page, setPage] = useState(1);
    const total = newsList.length % 8 > 0 ? newsList.length/8+1 : newsList.length/8;
    useEffect (() => {
        const token = localStorage.getItem('access-token');
        const getNewsList = async () => {
            try {
                const res = await getNews(token);
                setNewsList(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getNewsList();
    }, [])

    const handlerChangePage = useCallback((page) => {
        setPage(page);
    }, [])

    return (
        <Layout>
            
            <img className={classes.banner} src={chaomung} alt="banner"></img>
            <h1 className={classes.color_pink}>Tin mới nhất</h1>
            <div className="row">
                {/* {newsList.slice(0,8).map((item, index) => { */}
                {newsList.slice((page-1)*8, (page-1)*8+8).map((item, index) => {
                    return (
                        <div key={index} className="col-3">
                            <NewsCard news={item} color="pink" />
                        </div>
                    );
                })}
            </div>
            {/* <h1 className={classes.color_blue}>Tin hot</h1> */}
            {/* <HotNews newsList /> */}
            {total > 0 && <div className="d-flex">
                <div className="ms-auto">
                    {total > 0 && <MyPagination 
                        total={total}
                        current={page}
                        onChangePage={handlerChangePage}
                    />}
                </div>
            </div>}
        </Layout>
    )
}

export default Home;