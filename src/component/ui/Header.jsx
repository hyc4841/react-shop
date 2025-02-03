import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutButton from "./LogoutButton";
import ReGenerateAccessToken from "../../test/reGenerateAccessToken";

import { useSelector, useDispatch } from "react-redux";
import { login, logout, isLoggedInFetch } from "../../redux/reducer/userSlice";
import { Container, Col, Row, Button, Navbar, Nav } from "react-bootstrap";


const Header = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // 에러 상태

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // useSelector로 isLoggedIn 구독 상태 만들기
    const username = useSelector((state) => state.user.username);

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            try {
                dispatch(isLoggedInFetch());
            } catch (err) {
                console.error("데이터 요청 실패 : " + err);
                dispatch(logout()); // 로그인 상태 아님
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

    return (
        <header>
            <Navbar className="py-2 bg-body-tertiary border-bottom">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link>즐겨찾기</Nav.Link>
                        <Nav.Link></Nav.Link>
                    </Nav>
                    
                    <Nav>
                        {isLoggedIn ? 
                            <>
                                <Nav.Link>{username} 님</Nav.Link>
                                <Nav.Link>로그아웃</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link>로그인</Nav.Link>
                                <Nav.Link>회원가입</Nav.Link>
                            </>
                        }
                        <Nav.Link>고객센터</Nav.Link>
                    </Nav>
                        

                    

                    
                </Container>
            </Navbar>
            <hr/>
        </header>
    );
};

export default Header;