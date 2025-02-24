import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal, Dropdown } from "react-bootstrap";
import DaumPostModal from "./DaumPostModal";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

import { type } from "@testing-library/user-event/dist/type";
import styled from "styled-components";
import '../../../css/signupPage.css';


const Signup = (props) => {
    const navigate = useNavigate();

    const [ loginId, setLoginId ] = useState('');                 // 로그인 아이디
    const [ password, setPassword ] = useState('');  
    const [ passwordCheck, setpasswordCheck ] = useState('');             // 비밀번호
    const [ name, setName ] = useState('');                       // 이름
    const [ birthDate, setBirthDate ] = useState('');             // 생년월일
    const [ gender, setGender ] = useState('NONE');               // 성별
    const [ email, setEmail ] = useState('');                     // 이메일
    const [ phoneNum, setPhoneNum ] = useState('');               // 휴대전화 번호
   
    const [ city, setCity ] = useState('');                       // 도시
    const [ zipcode, setZipcode ] = useState('');                 // 우편번호
    const [ street, setStreet ] = useState('');                   // 주소
    const [ detailedAddress, setDetailedAddress ] = useState(''); // 상세주소

    const [ modalOnOff, setModalOnOff ] = useState(false);          // 주소 선택창 모달 변수
    const [ dropDownShow, setDropDownShow ] = useState(false);    // 생년월일 달력창 드롭다운 변수

    const [ birthDateShow, setBirthDateShow ] = useState('');     // 생년월일 표시 변수

    const [ error, setError ] = useState('');                      // 회원가입 오류 응답 변수

    const signupSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 방지
        const passwordAndCheck = { password, passwordCheck };
        try {
            const response = await axios.post('http://localhost:8080/signup', {
                loginId, passwordAndCheck, phoneNum, name, birthDate, gender, email, city, street, zipcode, detailedAddress
            }, { withCredentials: true });

            console.log(response);
            
            navigate('/'); // 회원가입 성공하면 홈 화면으로 이동

        } catch (error) {
            console.error("회원가입 오류 : ", error);
            setError(error.response.data);
        }
    }

    // 생년월일 달력 드롭다운 버튼 on, close 함수
    const birthDateDropdownHandler = (isOpen) => {
        setDropDownShow(isOpen);
    }

    // 
    const birthDateSelectHandler = (date) => {
        setBirthDateShow(moment(date).format("yyyy년 MM월 DD일"));
        setBirthDate(date);
        setDropDownShow(false);
    }

    return (
        <Container >
            <Row>
                <Col sm={12} className="text-center"><h2>회원가입</h2></Col>

                <Col sm={12} className='text-center'>
                    {error.message && 
                        <>
                            {error.message.map((error, index) => (
                                <p style={{ color: 'red' }}>{error.message}</p>
                            ))}
                        </>
                    }
                </Col>

                <Col sm={12} className="d-flex justify-content-center">

                    <Form onSubmit={signupSubmit} style={{ width: '600px', background: 'white', padding: '10px', borderRadius: '10px', border: '1px solid black'}}>

                        <Row className="p-3">
                            
                            {/* 이름 */}
                            <Col sm={12} className="p-0">
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>이름</Form.Label>
                                    <Form.Control onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder="이름을 입력하세요" />
                                    {error.name && 
                                    <>
                                        {error.name.map((error, index) => (
                                            <p style={{ color: 'red' }}>{error.message}</p>
                                        ))}
                                    </>
                                    }
                                    
                                </Form.Group>
                            </Col>

                            {/* 아이디 */}
                            <Col sm={12} className="p-0">
                                <Form.Group className="mb-3" controlId="userId">
                                    <Form.Label>아이디</Form.Label>
                                    <Form.Control onChange={(e) => setLoginId(e.target.value)} type="text" value={loginId} placeholder="아이디를 입력하세요" />
                                    <Form.Text className="text-muted">여기에 아이디를 입력하세요</Form.Text>
                                    {error.loginId && 
                                    <>
                                        {error.loginId.map((error, index) => (
                                            <p style={{ color: 'red' }}>{error.message}</p>
                                        ))}
                                    </>
                                    }
                                </Form.Group>
                            </Col>

                            {/* 비밀번호 */}
                            <Col sm={12} className="p-0">
                                <Form.Group className="mb-3">
                                    <Form.Label>비밀번호</Form.Label>
                                    <div className="d-flex">  
                                        <Form.Control style={{marginRight: "5px"}} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="비밀번호를 입력하세요" />
                                        <Form.Control style={{marginLeft: "5px"}} onChange={(e) => setpasswordCheck(e.target.value)} type="password" placeholder="비밀번호 확인" />                                     
                                    </div>
                                    {error.passwordAndCheck && 
                                    <>
                                        {error.passwordAndCheck.map((error, index) => (
                                            <p style={{ color: 'red' }}>{error.message}</p>
                                        ))}
                                    </>
                                    }
                                </Form.Group>
                            </Col>

                            {/* 이메일 */}
                            <Col sm={12} className="p-0">
                                <Form.Group className="mb-3">
                                    <Form.Label>이메일</Form.Label>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder="이메일을 입력하세요" />
                                    {error.email && 
                                    <>
                                        {error.email.map((error, index) => (
                                            <p style={{ color: 'red' }}>{error.message}</p>
                                        ))}
                                    </>
                                    }
                                </Form.Group>
                            </Col>

                            {/* 전화번호 */}
                            <Col sm={12} className="p-0">
                                <Form.Group className="mb-3">
                                    <Form.Label>전화번호</Form.Label>
                                    <Form.Control onChange={(e) => setPhoneNum(e.target.value)} type="text" value={phoneNum} placeholder="전화번호를 입력하세요" />
                                    {error.phoneNum && 
                                    <>
                                        {error.phoneNum.map((error, index) => (
                                            <p style={{ color: 'red' }}>{error.message}</p>
                                        ))}
                                    </>
                                    }
                                </Form.Group>
                            </Col>


                            {/* 성별 */}
                            <Col xs={12} className="p-0">
                                <Form>
                                    <Form.Label>성별</Form.Label>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="남자"
                                                name="gender"
                                                type={type}
                                                id="man"
                                                value={"MAN"}
                                                onChange={(e) => setGender(e.target.value)}
                                            />
                                            <Form.Check
                                                inline
                                                label="여자"
                                                name="gender"
                                                type={type}
                                                id="women"
                                                value={"WOMEN"}
                                                onChange={(e) => setGender(e.target.value)}
                                            />
                                    {error.gender && 
                                    <>
                                        {error.gender.map((error, index) => (
                                            <p style={{ color: 'red' }}>{error.message}</p>
                                        ))}
                                    </>
                                    }
                                        </div>
                                    ))}
                                </Form>
                            </Col>

                            {/* 주소 */}
                            <Col sm={12} className="p-0">
                                <Form.Label>주소</Form.Label>
                                <Row>
                                    <Col sm={6} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" placeholder="우편번호" value={zipcode} readOnly/>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6} md={6}>
                                        <Button className="mb-3" style={{whiteSpace: 'nowrap'}} onClick={() => setModalOnOff(true)}>
                                            우편번호 찾기
                                        </Button>
                                    </Col>
                                    
                                    {/* 다음 주소 모달 */}
                                    <DaumPostModal
                                        modalOnOff={modalOnOff}
                                        setModalOnOff={setModalOnOff}
                                        setZipcode={setZipcode}
                                        setCity={setCity}
                                        setStreet={setStreet}
                                    />

                                    <Col sm={12} md={6}>
                                        <Form.Group className="">
                                            <Form.Control type="text" placeholder="주소" value={street} readOnly/>
                                        </Form.Group>
                                        {error.street && 
                                            <>
                                                {error.street.map((error, index) => (
                                                    <p style={{ color: 'red', paddingTop: "0px"}}>{error.message}</p>
                                                ))}
                                            </>
                                        }
                                    </Col>

                                    

                                    <Col sm={12} md={6}>
                                    
                                        <Form.Group className="">
                                            <Form.Control type="text" onChange={(e) => setDetailedAddress(e.target.value)}
                                            value={detailedAddress} placeholder="상세주소를 입력해주세요"/> 
                                        </Form.Group>

                                        {error.detailedAddress && 
                                            <>
                                                {error.detailedAddress.map((error, index) => (
                                                    <p style={{ color: 'red', paddingTop: "0px"}}>{error.message}</p>
                                                ))}
                                            </>
                                        }

                                    </Col>
                                </Row>
                            </Col>
                            
                            {/* 생년월일 */}
                            <Col className="mb-3 p-0">
                                <Form.Group>
                                    <Form.Label>생년월일</Form.Label>
                                    <Dropdown onToggle={birthDateDropdownHandler} show={dropDownShow} className="mb-1">
                                        <Dropdown.Toggle id="birthDate-dropDown">
                                            생년월일을 선택해주세요
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Calendar 
                                                onChange={birthDateSelectHandler}
                                                value={birthDate}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Control
                                        id="bithDateShow"
                                        value={birthDateShow}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm={12} md={12}>
                                <Row className="d-flex justify-content-center">
                                    <Col xs="auto">
                                        <Button variant="primary" type="submit" style={{whiteSpace:'nowrap'}}>
                                            회원가입
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;