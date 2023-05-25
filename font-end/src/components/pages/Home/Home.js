import React, { useCallback, useEffect, useState } from 'react';
import classes from './Home.module.css';
import NewsCard from './news/NewsCard';
import MyPagination from "../../common/MyPagination";

import chaomung from '../../assets/image/banner.png';
// import HotNews from './news/HotNews';
import Layout from '../../layout/Layout';
import { getNews } from '../../../api/newsApi';
const Home = () => {
    const [tabNow, setTabNow] = useState(0);
    const [newsList, setNewsList] = useState([]);
    const [page, setPage] = useState(1);
    const total = newsList.length % 8 > 0 ? newsList.length / 8 + 1 : newsList.length / 8;
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
            </ul>
            
            {tabNow === 0 && 
                <div className={classes.background_tab}>
                    <h1 className={classes.color_green + " mt-3"}>Môn Toán</h1>
                    <div className="row">
                        {/* {newsList.slice(0,8).map((item, index) => { */}
                        {newsList.slice((page - 1) * 8, (page - 1) * 8 + 8).map((item, index) => {
                            return (
                                <div key={index} className="col-3">
                                    <NewsCard news={item} color="green" />
                                </div>
                            );
                        })}
                    </div>
                    {total > 0 && <div className="d-flex">
                        <div className="ms-auto">
                            {total > 0 && <MyPagination
                                total={total}
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
                        {newsList.slice((page - 1) * 8, (page - 1) * 8 + 8).map((item, index) => {
                            return (
                                <div key={index} className="col-3">
                                    <NewsCard news={item} color="green" />
                                </div>
                            );
                        })}
                    </div>
                    {total > 0 && <div className="d-flex">
                        <div className="ms-auto">
                            {total > 0 && <MyPagination
                                total={total}
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
                        {newsList.slice((page - 1) * 8, (page - 1) * 8 + 8).map((item, index) => {
                            return (
                                <div key={index} className="col-3">
                                    <NewsCard news={item} color="green" />
                                </div>
                            );
                        })}
                    </div>
                    {total > 0 && <div className="d-flex">
                        <div className="ms-auto">
                            {total > 0 && <MyPagination
                                total={total}
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