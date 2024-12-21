import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import LogoutButton from "./LogoutButton";

const Header = () => {

    const [username, setUsername] = useState(''); // 데이터 상태
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // 에러 상태
    const [content, setContent] = useState(null);

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
                setUsername(response.data.userName);
                console.log(username);
            } catch (err) {
                console.error("데이터 요청 실패 : " + err);
            } finally {
                setLoading(false);
            }
        };

        if (localStorage.getItem('accessToken') != null) {
            console.log("순서 확인");
            fetchData();
            setContent((
                <Col>
                    <span>안녕하세요</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <LogoutButton title="로그아웃"/>
                        
                </Col>
            ));
        } else {
            setContent((
                <Col>
                    <a href="/login">로그인</a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="/signup">회원가입</a>
                </Col>
            ));
        }
    }, [])

    console.log("여기까지 통과")

    return (
        <header>
            <Container>
                <Row>
                    <Col>
                        <a href="/">홈 {username}</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="/board">게시판</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                    </Col>
                    {content}
                </Row>
            </Container>
            <hr/>
        </header>
    );
};

export default Header;