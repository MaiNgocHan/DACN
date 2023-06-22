import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Layout from "../../layout/Layout";
import MyPagination from "../../common/MyPagination";
import { changeStatusUser, deleteUser, getUsers } from "../../../api/adminApi";
const AccountManagement = () => {
    const [usersList, setUsersList] = useState([]);
    const [page, setPage] = useState(1);
    const total = usersList.length % 8 > 0 ? usersList.length/8+1 : usersList.length/8;
    const token = localStorage.getItem('access-token');

    const deletedUserHandler = async (id) => {
        const list = [...usersList];
        const index = list.findIndex((user) => user._id === id);
        list.splice(index, 1);
        try {
            await deleteUser(id, token);
            setUsersList(list);
        } catch (error) {
            console.log(error.message);
        }
    }

    const changeStatusUserHandler = async (id) => {
        try {
            await changeStatusUser(id, token);
            const list = [...usersList];
            const index = list.findIndex((user) => user._id === id);
            list[index].statusType = !list[index].statusType;
            setUsersList(list);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        const getUsersList = async () => {
            try {
                const res = await getUsers(token);
                setUsersList(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getUsersList();
    }, [])

    const handlerChangePage = useCallback((page) => {
        setPage(page);
    }, [])

    return (
        <Layout props={{type: "admin"}}>
            <h1 className="my-4">Danh sách tài khoản</h1>
            <Table hover className="table table-bordered border-secondary" style={{tableLayout: "fixed"}}>
                <thead>
                    <tr>
                        <th colSpan="1">STT</th>
                        <th colSpan="2">Họ và tên</th>
                        <th colSpan="2">Email</th>
                        <th colSpan="1">Trạng thái</th>
                        <th colSpan="1">Loại</th>
                        <th colSpan="5"></th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.slice((page-1)*8, (page-1)*8+8).map((user, index) => {
                        return (<tr key={index}>
                            <td colSpan="1">{index+1}</td>
                            <td colSpan="2">{user.username}</td>
                            <td colSpan="2">{user.email}</td>
                            <td colSpan="1">{user.statusType ? <p className='text-success fw-bold'>Hoạt động</p> : <p className='text-danger fw-bold'>Bị khóa</p>}</td>
                            <td colSpan="1">{user.type}</td>
                            <td colSpan="5">
                               <div className="d-flex">
                                    <div className="me-3"><Button variant="outline-danger" onClick={() => deletedUserHandler(user._id)}>Xóa người dùng</Button></div>
                                    <div><Button variant="outline-primary" onClick={() => changeStatusUserHandler(user._id)}>{user.statusType ? "Khóa người dùng" : "Mở khóa người dùng"}</Button></div>
                               </div> 
                            </td>
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
        </Layout>
    )
};

export default AccountManagement;