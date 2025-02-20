import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

import { useSelector, useDispatch } from "react-redux";
import { logout, isLoggedInFetch } from "../../redux/reducer/userSlice";
import { Container, Navbar, Nav, Dropdown, Form, Button } from "react-bootstrap";


import { StyledNavItem } from "../style/header/headrStyle";

import logo from '../../image/logo.jpg';


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

    }, []);

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
                <Container className="d-flex flex-wrap justify-content-between">
                    <div className="d-flex">
                        <Dropdown>
                            <a href="#">드랍다운 카테고리</a>
                        </Dropdown>

                        <Navbar.Brand href="/" className="me-lg-auto">
                            <img src={logo} alt="로고" style={{width: "90px", height: "50px"}} />
                        </Navbar.Brand>
                    </div>
                    
                    <Form className="d-flex" method="get" action="/item">
                        <Form.Group controlId="SearchForm.input">
                            <Form.Control type="text" placeholder="검색어를 입력해주세요" style={{height: "100%"}} name="searchKeyword" />
                        </Form.Group>
                        <Button type="submit">검색</Button>
                    </Form>

                    <div>

                    </div>
                    
                </Container>
            </header>
        </>
        
    );
};

export default Header;