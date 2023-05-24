import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Layout from "../../layout/Layout";
import MyPagination from "../../common/MyPagination";
import CreateNewsModal from "./CreateNewsModal";
import { getNews} from '../../../api/newsApi';
import { deleteNews } from '../../../api/adminApi';

import classes from './admin.module.css';

const Admin = () => {
    const [newsList, setNewsList] = useState([]);
    const token = localStorage.getItem('access-token');
    
    useEffect(() => {
        const getNewsList = async () => {
            try {
                const res = await getNews(token);
                setNewsList(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getNewsList();
    }, [token])


    const [page, setPage] = useState(1);
    const total = newsList.length % 8 > 0 ? newsList.length/8+1 : newsList.length/8;

    const deletedNewsHandler  = async (id) => {
        const list = [...newsList];
        const index = list.findIndex((news) => news._id === id);
        list.splice(index, 1);
        try {
            await deleteNews(id, token);
            setNewsList(list);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handlerChangePage = useCallback((page) => {
        setPage(page);
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Layout props={{type: "admin"}}>
            <div className="d-flex align-items-center">
                <h1 className="my-4">Danh sách bài viết</h1>
                <div className="ms-auto"><Button variant="success" className="fw-bolder" onClick={handleShow}>+ Tạo bài viết</Button></div>
            </div>
            <Table hover className="table table-bordered border-dark" style={{tableLayout: "fixed"}}>
                <thead>
                    <tr>
                        <th colSpan="1">STT</th>
                        <th colSpan="4">Tiêu đề</th>
                        <th colSpan="2">Hình ảnh</th>
                        <th colSpan="2">Ngày đăng</th>
                        <th colSpan="3">Xóa bài viết</th>
                    </tr>
                </thead>
                <tbody>
                    {newsList.slice((page-1)*8, (page-1)*8+8).map((news, index) => {
                        return (<tr key={index}>
                            <td colSpan="1">{index+1}</td>
                            <td colSpan="4">{news.title}</td>
                            <td colSpan="2">
                                <img className={classes.image} src={news.image} alt="news" width='100'></img>
                            </td>
                            <td colSpan="2">{Date(news.createdAt).slice(0, 24)}</td>
                            <td colSpan="3"><Button variant="outline-danger" onClick={() => deletedNewsHandler(news._id)}>Xóa bài viết</Button></td>
                        </tr>)
                    })}
                </tbody>
            </Table>
            <div className="d-flex">
                <div className="ms-auto">
                    {total > 0 && <MyPagination 
                        total={total}
                        current={page}
                        onChangePage={handlerChangePage}
                    />}
                </div>
            </div>
            <CreateNewsModal show={show} newsList={newsList} handleClose={handleClose} setNewsList={setNewsList}/>
        </Layout>
    )
}

export default Admin;