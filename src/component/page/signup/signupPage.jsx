import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Signup = () => {

    return (
        <Container >
            <Row>
                <Col sm={12} className="text-center"><h2>회원가입</h2></Col>

                <Col sm={12} className="d-flex justify-content-center">
                    <Form style={{ width: '600px', background: 'skyblue', padding: '10px'}}>

                        <Form.Group className="mb-3" controlId="userId">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control type="text" placeholder="아이디를 입력하세요" />
                            <Form.Text className="text-muted">여기에 아이디를 입력하세요</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" placeholder="이메일을 입력하세요" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>주소</Form.Label>
                            <Form.Control type="email" placeholder="이메일을 입력하세요" />
                        </Form.Group>
                        

                        
                        <Button variant="primary" type="submit">
                            회원가입
                        </Button>
                        
                    </Form>



                </Col>


            </Row>
            

        </Container>
    );
}

export default Signup;