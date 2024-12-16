import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import axios from "axios";

import useFetch from "../../requestAPI/useFetch";

const Header = () => {

    const [data, setData] = useState([]); // 데이터 상태
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        var fetchdata = useFetch("http://localhost:8080/member/islogin");
        setData(fetchdata.data);
        setError(fetchdata.error);
        setLoading(fetchdata.loading);
    }, []);

    var isLoggedIn


    return (
        <header>
            <Container>
                <Row>
                    <Col>
                        <a href="/">홈</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="/board">게시판</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                    </Col>

                    <Col>
                        <a href="/login">로그인</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="/signup">회원가입</a>
                    </Col>


                </Row>
            </Container>
            <hr/>
        </header>
    );
};

export default Header;