// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';
import BoardPage from './component/page/BoardPage';
import LoginPage from './component/page/login/LoginPage'
import SignupPage from './component/page/signup/signupPage';
import Header from './component/ui/Header';
import Footer from './component/ui/Footer';

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App(props) {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path='signup' element={<SignupPage />} />
                <Route path="post-write" element={<PostWritePage />} />
                <Route path="post/:postId" element={<PostViewPage />} />
                <Route path="board" element={<BoardPage />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
