// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/board/PostWritePage';
import PostViewPage from './component/page/board/PostViewPage';

import BoardPage from './component/page/board/BoardPage'
import LoginPage from './component/page/login/LoginPage'
import SignupPage from './component/page/signup/SignupPage';

import MemberInfoPage from './component/page/member/MemberInfoPage';

import Header from './component/ui/Header';
import Footer from './component/ui/Footer';
import ItemListPage from './component/page/item/ItemListPage';
import SalesPage from './component/page/salesPage/SalesPage';

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
                <Route path="board" element={<BoardPage />} />
                <Route path="mypage/info" element={<MemberInfoPage />} />
                <Route path="/products" element={<ItemListPage />} />
                <Route path="/salesPage/" element={<SalesPage />} />

            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
