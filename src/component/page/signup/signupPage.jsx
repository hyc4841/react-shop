import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import DaumPostModal from "./DaumPostModal";
import { type } from "@testing-library/user-event/dist/type";


const Signup = (props) => {

    const navigate = useNavigate();

    const [ loginId, setLoginId ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');
    const [ gender, setGender ] = useState('NONE');
    const [ email, setEmail ] = useState('');
   
    const [ city, setCity ] = useState('');
    const [ zipcode, setZipcode ] = useState('');
    const [ street, setStreet ] = useState('');
    const [ detailedAddress, setDetailedAddress ] = useState('');
    const [ modalShow, setModalShow ] = useState(false);

    const [error, setError ] = useState('');

    const signupSubmit = async (e) => {
        e.preventDefault();

        console.log("회원가입 시도");
        console.log("loginId : " + loginId);
        console.log("password : " + password);
        console.log("name : " + name);
        console.log("birthDate : " + birthDate);
        console.log("gender : " + gender);
        console.log("email : " + email);
        console.log("zonecode : " + zipcode);
        console.log("street : " + street);
        console.log("detailedAddress : " + detailedAddress);

        try {
            const response = await axios.post('http://localhost:8080/signup', {
                loginId, password, name, birthDate, gender, email, city, street, zipcode, detailedAddress
            }, { withCredentials: true });

            console.log(response);
            
            navigate('/'); // 회원가입 성공하면 홈 화면으로 이동

        } catch (err) {
            console.error("회원가입 오류 : ", err);
            setError(err.response.data.message);
        }
    }

    // 주소 선택했을 때 실행되는 함수. 우편번호와 지번 혹은 도로명 주소값이 결정된다.
    const onCompleteHandler = (data) => {
        const zipcode = data.zonecode;
        setZipcode(zipcode);

        var addr = '';
        var extraAddr = '';

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
            // setAddress(data.roadAddress);
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
        }
        setStreet(addr + extraAddr);
    };

    // 주소 모달 열고 닫을 때 실행되는 함수
    const onCloseHandler = (state) => {
        console.log("state : " + state);
        if (state === 'FORCE_CLOSE') {
            setModalShow(false);
        } else if (state === 'COMPLETE_CLOSE') {
            setModalShow(false);
        }
    };

    // 상세주소 값을 결정하는 함수    
    const detailedAddressHandler = (event) => {
        console.log("텍스트 내용? : " + event.target.value);
        setDetailedAddress(event.target.value);
    }

    return (
        <Container >
            <Row>
                <Col sm={12} className="text-center"><h2>회원가입</h2></Col>

                <Col sm={12} className='text-center'>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Col>

                <Col sm={12} className="d-flex justify-content-center">

                    <Form onSubmit={signupSubmit} style={{ width: '600px', background: 'white', padding: '10px', borderRadius: '10px', border: '1px solid black'}}>

                        <Row>
                            <Col sm={12}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>이름</Form.Label>
                                    <Form.Control onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder="이름을 입력하세요" />
                                </Form.Group>
                            </Col>

                            <Col sm={12}>
                                <Form.Group className="mb-3" controlId="userId">
                                    <Form.Label>아이디</Form.Label>
                                    <Form.Control onChange={(e) => setLoginId(e.target.value)} type="text" value={loginId} placeholder="아이디를 입력하세요" />
                                    <Form.Text className="text-muted">여기에 아이디를 입력하세요</Form.Text>
                                </Form.Group>
                            </Col>

                            <Col sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>비밀번호</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="비밀번호를 입력하세요" />
                                </Form.Group>
                            </Col>

                            <Col sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>이메일</Form.Label>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder="이메일을 입력하세요" />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
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

                                        </div>
                                    ))}
                                </Form>
                            </Col>

                            <Col sm={12}>
                                <Form.Label>주소</Form.Label>
                                <Row>
                                    <Col sm={6} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" placeholder="우편번호" value={zipcode} readOnly/>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6} md={6}>
                                        <Button className="mb-3" style={{whiteSpace: 'nowrap'}} onClick={() => setModalShow(true)}>
                                            우편번호 찾기
                                        </Button>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" placeholder="주소" value={street} readOnly/>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={12} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" placeholder="상세 주소"
                                            value={detailedAddress}
                                            onChange={(e) => setDetailedAddress(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col className="mb-3">
                                <Form.Group>
                                    <Form.Label>생년월일</Form.Label>
                                    
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
                           
                            <DaumPostModal
                                show={modalShow} 
                                onHide={() => setModalShow(false)}
                                onCompleteHandler={onCompleteHandler} // 원래 넘겨주려는 함수 이름 onCompleteHandler. props로 함수 이름이 on 으로 시작하는 함수가 가끔 on으로 시작하는 자바스크립트 이벤트로 인지해서 발생하는
                                onCloseHandler={onCloseHandler}
                            />  

                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;