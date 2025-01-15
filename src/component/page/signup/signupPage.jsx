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

    // 주소 선택했을 때 실행되는 함수. 우편번호와 지번 혹은 도로명 주소값이 결정된다.
    const onCompleteHandler = (data) => {
        const zonecode = data.zonecode;
        setZonecode(zonecode);

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
        setAddress(addr + extraAddr);

        console.log("zonecode : " + zonecode);
        console.log("address : " + address);
    };

    // 주소창을 열고 닫을 때 실행되는 함수
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

                <Col sm={12} className="d-flex justify-content-center">

                    <Form style={{ width: '600px', background: 'white', padding: '10px', borderRadius: '10px', border: '1px solid black'}}>

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
                                
                                <Form.Label>주소</Form.Label>
                                <Row>
                                    <Col sm={6} md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" placeholder="우편번호" value={zonecode} readOnly/>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6} md={6}>
                                        <Button className="mb-3" style={{whiteSpace: 'nowrap'}} onClick={() => setModalShow(true)}>
                                            우편번호 찾기
                                        </Button>
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

                                </Row>
                                

                            </Col>
                            
                            

                            <Col sm={12} md={12}>
                                <Row className="d-flex justify-content-center">
                                    <Col x="auto">
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