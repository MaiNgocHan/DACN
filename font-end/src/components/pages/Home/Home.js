import React, { useCallback, useEffect, useState } from 'react';
import classes from './Home.module.css';
import NewsCard from '../../common/NewsCard';
import MyPagination from "../../common/MyPagination";

import chaomung from '../../assets/image/banner.png';
// import HotNews from './news/HotNews';
import Layout from '../../layout/Layout';
import { getNews } from '../../../api/newsApi';
import { getMathNews } from '../../../api/newsApi';
import { getLiterNews } from '../../../api/newsApi';
import { getEnglishNews } from '../../../api/newsApi';
import { getOtherhNews } from '../../../api/newsApi';
const Home = () => {
    const [tabNow, setTabNow] = useState(0);
    const [newsList, setNewsList] = useState([]);
    const [mathNewsList, setMathNews] = useState([]);
    const [literNewsList, setLiterNews] = useState([]);
    const [englishNewsList, setEnglishNews] = useState([]);
    const [otherhNewsList, setOtherhNews] = useState([]);
    const [page, setPage] = useState(1);
    const total = newsList.length % 8 > 0 ? newsList.length / 8 + 1 : newsList.length / 8;
    const mathTotal = mathNewsList.length % 8 > 0 ? mathNewsList.length / 8 + 1 : mathNewsList.length / 8;
    const literTotal = literNewsList.length % 8 > 0 ? literNewsList.length / 8 + 1 : literNewsList.length / 8;
    const englishTotal = englishNewsList.length % 8 > 0 ? englishNewsList.length / 8 + 1 : englishNewsList.length / 8;
    const otherhTotal = otherhNewsList.length % 8 > 0 ? otherhNewsList.length / 8 + 1 : otherhNewsList.length / 8;
    useEffect(() => {
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

        const getMathNewsList = async () => {
            try {
                const res = await getMathNews(token);
                setMathNews(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getMathNewsList();

        const getLiterNewsList = async () => {
            try {
                const res = await getLiterNews(token);
                setLiterNews(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getLiterNewsList();

        const getEnglishNewsList = async () => {
            try {
                const res = await getEnglishNews(token);
                setEnglishNews(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getEnglishNewsList();

        const getOtherhNewsList = async () => {
            try {
                const res = await getOtherhNews(token);
                setOtherhNews(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getOtherhNewsList();
    }, [])

    const handlerChangePage = useCallback((page) => {
        setPage(page);
    }, [])

    return (
        <Layout>

            <img className={classes.banner} src={chaomung} alt="banner"></img>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button type='button' className={tabNow === 0 ? `nav-link active ${classes.nav_link_text}` : `nav-link ${classes.nav_link_text}`} onClick={() => setTabNow(0)}>Toán</button>
                </li>
                <li className="nav-item">
                    <button  className={tabNow === 1 ? `nav-link active ${classes.nav_link_text}` : `nav-link ${classes.nav_link_text}`} onClick={() => setTabNow(1)}>Văn</button>
                </li>
                <li className="nav-item">
                    <button  className={tabNow === 2 ? `nav-link active ${classes.nav_link_text}` : `nav-link ${classes.nav_link_text}`} onClick={() => setTabNow(2)}>Anh</button>
                </li>
                <li className="nav-item">
                    <button  className={tabNow === 3 ? `nav-link active ${classes.nav_link_text}` : `nav-link ${classes.nav_link_text}`} onClick={() => setTabNow(3)}>Khác</button>
                </li>
            </ul>
            
            {tabNow === 0 && 
                <div className={classes.background_tab}>
                    <h1 className={classes.color_green + " mt-3"}>Môn Toán</h1>
                    <div className="row">
                        {/* {newsList.slice(0,8).map((item, index) => { */}
                        {mathNewsList.slice((page - 1) * 8, (page - 1) * 8 + 8).map((news, index) => {
                            return (
                                <div key={index} className="col-3">
                                    <NewsCard type='news' item={news} color="green" />
                                </div>
                            );
                        })}
                    </div>
                    {mathTotal > 0 && <div className="d-flex">
                        <div className="ms-auto">
                            {mathTotal > 0 && <MyPagination
                                total={mathTotal}
                                current={page}
                                onChangePage={handlerChangePage}
                            />}
                        </div>
                    </div>}
                </div>
            }
            {tabNow === 1 && 
                <div className={classes.background_tab}>
                    <h1 className={classes.color_green + " mt-3"}>Môn Văn</h1>
                    <div className="row">
                        {/* {newsList.slice(0,8).map((item, index) => { */}
                        {literNewsList.slice((page - 1) * 8, (page - 1) * 8 + 8).map((news, index) => {
                            return (
                                <div key={index} className="col-3">
                                    <NewsCard type='news' item={news} color="green" />
                                </div>
                            );
                        })}
                    </div>
                    {literTotal > 0 && <div className="d-flex">
                        <div className="ms-auto">
                            {literTotal > 0 && <MyPagination
                                total={literTotal}
                                current={page}
                                onChangePage={handlerChangePage}
                            />}
                        </div>
                    </div>}
                </div>
            }
            {tabNow === 2 && 
                <div className={classes.background_tab}>
                    <h1 className={classes.color_green + " mt-3"}>Môn Anh</h1>
                    <div className="row">
                        {/* {newsList.slice(0,8).map((item, index) => { */}
                        {englishNewsList.slice((page - 1) * 8, (page - 1) * 8 + 8).map((news, index) => {
                            return (
                                <div key={index} className="col-3">
                                    <NewsCard type='news' item={news} color="green" />
                                </div>
                            );
                        })}
                    </div>
                    {englishTotal > 0 && <div className="d-flex">
                        <div className="ms-auto">
                            {englishTotal > 0 && <MyPagination
                                total={englishTotal}
                                current={page}
                                onChangePage={handlerChangePage}
                            />}
                        </div>
                    </div>}
                </div>
            }
            {tabNow === 3 && 
                <div className={classes.background_tab}>
                    <h1 className={classes.color_green + " mt-3"}>Môn khác</h1>
                    <div className="row">
                        {/* {newsList.slice(0,8).map((item, index) => { */}
                        {otherhNewsList.slice((page - 1) * 8, (page - 1) * 8 + 8).map((news, index) => {
                            return (
                                <div key={index} className="col-3">
                                    <NewsCard type='news' item={news} color="green" />
                                </div>
                            );
                        })}
                    </div>
                    {otherhTotal > 0 && <div className="d-flex">
                        <div className="ms-auto">
                            {otherhTotal > 0 && <MyPagination
                                total={otherhTotal}
                                current={page}
                                onChangePage={handlerChangePage}
                            />}
                        </div>
                    </div>}
                </div>
            }
        </Layout>
    )
}

export default Home;