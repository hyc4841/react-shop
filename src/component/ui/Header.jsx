import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import LogoutButton from "./LogoutButton";
import ReGenerateAccessToken from "../../test/reGenerateAccessToken";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/reducer/userSlice";

const Header = () => {

    const [username, setUsername] = useState(''); // 데이터 상태
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // 에러 상태
    const [content, setContent] = useState(null);

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // useSelector로 isLoggedIn 구독 상태 만들기

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            try {
                console.log("요청 보내기");
                const response = await axios.get('http://localhost:8080/member/islogin', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
                });
    
                // isLoggedIn true : 현재 로그인 상태로 바꿈
                dispatch(login());

                setUsername(response.data.userName);

                console.log(username);
            } catch (err) {
                console.error("데이터 요청 실패 : " + err);
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };
        
        if (localStorage.getItem('accessToken') != null) {
            // 로컬에 엑세스 코인이 있으면
            console.log("엑세스 코인 있음 확인 요청");
            fetchData();
           
        } 


    }, [])

    console.log("여기까지 통과")

    return (
        <header>
            <Container>
                <Row>
                    <Col>
                        <a href="/">홈</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="/board">게시판</a>
                    </Col>
                    {isLoggedIn ? <Col>
                                    <span>안녕하세요 {username}님!</span>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <LogoutButton title="로그아웃"/>
                                    </Col> : 
                                    <Col>
                                        <a href="/login">로그인</a>
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <a href="/signup">회원가입</a>
                                    </Col>}

                    <Col>
                        <ReGenerateAccessToken/>
                    </Col>
                </Row>
            </Container>
            <hr/>
        </header>
    );
};

export default Header;