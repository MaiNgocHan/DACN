import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Home from "./components/pages/Home/Home";
import Admin from './components/pages/admin/Admin';
import AccountManagement from './components/pages/admin/AccountManagement';
import NewsDetail from './components/pages/Home/newsDetail/NewsDetail';
import Quiz from './components/pages/Quiz/Quiz';

import { getNews } from './api/newsApi';

import { quizMockData } from './components/dummyData/dummyData';
import QuizTemplate from './components/pages/Quiz/QuizTemplate';

//  import { dummyDataNews } from './components/dummyData/dummyData';
function App() {
  
  const isLogin = !!localStorage.getItem('access-token');

  const [newsList, setNewsList] = useState([]);
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
}, [])

  
  return (
    <Router className = "app">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/> 
          <Route path='/home' element={ <Home/>}/>
          <Route path='/quiz' element={ <Quiz/>}/>
          <Route path='/admin/news' element={isLogin ? <Admin/> : <Navigate to='/'/>}/>
          <Route path='/admin/users' element={isLogin ? <AccountManagement/> : <Navigate to='/'/>}/>
          
          {/* <Route path="/news/:id" element={<NewsDetail/>} /> */}
          {newsList.map((news, index) => 
            <Route key={index} path={`/news/:_id`} element={ 
              isLogin ? <NewsDetail news={news} /> : <Navigate to='/'/>
            }></Route>
          )}
        </Routes>
    </Router>
  );
}

export default App;
