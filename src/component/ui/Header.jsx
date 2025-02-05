import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutButton from "./LogoutButton";
import ReGenerateAccessToken from "../../test/reGenerateAccessToken";

import { useSelector, useDispatch } from "react-redux";
import { login, logout, isLoggedInFetch } from "../../redux/reducer/userSlice";
import { Container, Col, Row, Button, Navbar, Nav } from "react-bootstrap";

import { StyledNavItem } from "../style/header/headrStyle";


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
    
    console.log("isLoggedIn : " + isLoggedIn);
    console.log("username : " + username);

    return (
        <>
            <Navbar className="py-2 bg-body-tertiary border-bottom">
                <Container className="d-flex flex-wrap">

                    <Nav className="me-auto">
                        <StyledNavItem>즐겨찾기</StyledNavItem>
                    </Nav>
                    
                    <Nav>
                        {isLoggedIn ? 
                            <>
                                <StyledNavItem href="/mypage/info">{username} 님</StyledNavItem>
                                <LogoutButton title="로그아웃" />
                            </>
                            :
                            <>
                                <StyledNavItem href="/login">로그인</StyledNavItem>
                                <StyledNavItem href="/signup">회원가입</StyledNavItem>
                            </>
                        }
                        <StyledNavItem>고객센터</StyledNavItem>
                    </Nav>
                </Container>
            </Navbar>

                        
            <header className="py-3 mb-4 border-bottom">
                <Container className="d-flex flex-wrap justify-content-center">
                    <Navbar.Brand href="/" className="me-lg-auto">
                        <img></img>
                        윤철몰
                    </Navbar.Brand>
                </Container>
            </header>
        </>
        
    );
};

export default Header;