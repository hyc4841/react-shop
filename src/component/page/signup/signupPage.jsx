import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";

const Signup = () => {

    return (
        <Container >
            <Row>
                <Col sm={12} className="text-center"><h2>회원가입</h2></Col>

                <Col sm={12} className="d-flex justify-content-center">
                    <form style={{ width: '600px', background: 'skyblue', padding: '10px'}}>
                        <div>
                            <label>아이디</label>
                            
                        </div>
                    </form>
                </Col>


            </Row>
            

        </Container>
    );
}

export default Signup;