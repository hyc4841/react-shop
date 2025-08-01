import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login, loginFetch } from '../../../redux/reducer/userSlice';


import { Container, Button, Row, Col } from 'react-bootstrap';


const Login = () => { // 컴포넌트 선언 arrow function 방식

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const prevPageData = location.state?.from?.state.prevPageData;
    console.log("로그인 페이지. 이전 페이지 데이터 : ", prevPageData);

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginError = useSelector((state) => state.user.loginError);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('아이디:', loginId);
        console.log('비번:', password);
        const credentials = { loginId, password };

        try {
            const resultAction = await dispatch(loginFetch(credentials));

            if (loginFetch.fulfilled.match(resultAction)) {
                console.log("resultAction : ", resultAction);
                // 로그인 성공하면 홈 화면으로
                navigate(from, { replace: true, state: { prevPageData: prevPageData } }); // replace: true 뒤로가기 했을 때, 로그인 페이지로 돌아가지 않도록 만들기
            }

        } catch (err) {
            console.error('로그인 오류:', err);
            setError(err.response.data.message);
        }
    };

    return (
        <Container style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <Row className='justify-content-md-center'>
                <Col sm={12}  className='text-center'>
                    <h2>로그인</h2>
                </Col>
                <Col sm={12} className='text-center'>
                    {loginError && <p style={{ color: 'red' }}>{loginError.message}</p>}
                </Col>

                <Col sm={12}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label htmlFor="loginId">아이디</label>
                                <input
                                    type="text"
                                    id="loginId"
                                    value={loginId}
                                    onChange={(e) => setLoginId(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                            <Button variant='success' size='md'
                            type="submit" style={{ padding: '10px 15px', marginRight: '20px' }}>로그인하기</Button>

                            <Button variant='success' size='lg'
                            type="submit" style={{ padding: '10px 15px' }} disabled>로그인하기</Button>
                        </form>
                    </div>
                </Col>
            </Row>
            
            
        
        </Container>
    );
};

export default Login;
