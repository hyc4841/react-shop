import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import DaumPostModal from "./DaumPostModal";


const Signup = (props) => {

    const [ zonecode, setZonecode ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ detailedAddress, setDetailedAddress ] = useState('');
    const [ modalShow, setModalShow ] = useState(false);

    const onCompleteHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            setAddress(data.roadAddress);
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            setAddress(data.jibunAddress);
        }

        console.log("zonecode : " + zonecode);
        console.log("address : " + address);
    };

    const onCloseHandler = (state) => {
        console.log("state : " + state);
        if (state === 'FORCE_CLOSE') {
            setModalShow(false);
        } else if (state === 'COMPLETE_CLOSE') {
            setModalShow(false);
        }
    };

    const detailedAddressHandler = (event) => {
        console.log("텍스트 내용? : " + event.target.value);
        setDetailedAddress(event.target.value);
    }

    return (
        <Container >
            <Row>
                <Col sm={12} className="text-center"><h2>회원가입</h2></Col>

                <Col sm={12} className="d-flex justify-content-center">
                    <Form style={{ width: '600px', background: 'skyblue', padding: '10px'}}>

                        <Row>
                            <Col sm={12}>
                                <Form.Group className="mb-3" controlId="userId">
                                    <Form.Label>아이디</Form.Label>
                                    <Form.Control type="text" placeholder="아이디를 입력하세요" />
                                    <Form.Text className="text-muted">여기에 아이디를 입력하세요</Form.Text>
                                </Form.Group>
                            </Col>

                            <Col sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>비밀번호</Form.Label>
                                    <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                                </Form.Group>
                            </Col>

                            <Col sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>이메일</Form.Label>
                                    <Form.Control type="email" placeholder="이메일을 입력하세요" />
                                </Form.Group>
                            </Col>

                            <Col sm={12}>
                                <Form.Group className="mb-3">
                                <Form.Label>주소</Form.Label>

                                    <Row xs={2} md={4}>
                                        <Col style={{paddingRight: '5px'}}>
                                            <Form.Control type="text" placeholder="우편번호" value={zonecode} readOnly/>
                                        </Col>

                                        <Col style={{paddingLeft: '5px'}}>
                                            <Button style={{whiteSpace: 'nowrap'}} onClick={() => setModalShow(true)}>
                                                우편번호 찾기
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>

                            </Col>
                            
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="주소" value={address} readOnly/>
                                </Form.Group>
                            </Col>

                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="상세 주소"
                                    value={detailedAddress}
                                    onChange={detailedAddressHandler} />
                                </Form.Group>
                            </Col>

                            <Col sm={12} md={12}>
                                <Row className="justify-content-center">
                                    <Col xs sm md >
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