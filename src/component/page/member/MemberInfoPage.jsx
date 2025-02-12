import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Table, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Mypga from "../../page/member/MyPageNav";
import MypageNav from "../../page/member/MyPageNav";

import '../../../css/memberInfoPage.css';
import PasswordChangeButton from "./PasswordChangButton";

const MemberInfo = (props) => {
    const navigate = useNavigate();

    const [ memberData, setMemberData ] = useState(null);
    const [ curPwd, setCurPwd ] = useState("");
    const [ newPwd, setNewPwd ] = useState("");
    const [ newPwdCon, setNewPwdCon ] = useState("");


    useEffect(() => {

        const fetchMemberData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/member/info', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
                });
                console.log(response);

            } catch (error) {
                console.log(error);
                alert("유저를 검증할 수 없습니다.");
                navigate('/'); // 만약 잘못된 토큰 제시로 보안상 문제가 있으면 홈 화면으로 이동
            }
        }

        fetchMemberData();
    }, []);


    return (
        <Container style={{ border: '1px solid blue', display: "flex"}}>
           
            <MypageNav />
        
            <Container style={{ border: '1px solid black',}}>
                <h1 style={{ fontSize: "25px", fontWeight: 'bold' }}>
                    회원 정보
                </h1>

                <Table>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td>dbscjf4841@naver.com<Button>변경</Button></td>
                        </tr>
                            
                        <tr>
                            <td>이름</td>
                            <td>황윤철</td>
                        </tr>
                        <tr>
                            <td>휴대폰 번호</td>
                            <td>01099694841</td>
                        </tr>
                        <tr>
                            <td>비밀번호 변경</td>
                            <td>

                                <Table style={{marginBottom: "0px"}}>
                                    <tr>
                                        <th>현재 비밀번호</th>
                                        <td>
                                            <input className="form-control" onChange={(e) => setCurPwd(e.target.value)}
                                            style={{marginBottom: "15px", width: "auto", height: "auto"}} />
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th>새 비밀번호</th>
                                        <td>
                                            <input className="form-control" onChange={(e) => setNewPwd(e.target.value)}
                                            style={{marginBottom: "15px", width: "auto"}} />
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th>비밀번호 확인</th>
                                        <td>
                                            <input className="form-control" onChange={(e) => setNewPwdCon(e.target.value)} 
                                            style={{marginBottom: "15px", width: "auto"}} />
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td>
                                            <PasswordChangeButton
                                                curPwd={curPwd}
                                                newPwd={newPwd}
                                                newPwdCon={newPwdCon}
                                            />
                                        </td>
                                    </tr>
                                </Table>
                            </td>
                        </tr>
                        <tr>
                            <th>배송지</th>
                            <td>배송지 관리</td>
                        </tr>




                    </tbody>

                </Table>

            </Container>
            
        </Container>
        
    );

}

export default MemberInfo;
