import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Table, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Mypga from "../../page/member/MyPageNav";
import MypageNav from "../../page/member/MyPageNav";

import '../../../css/memberInfoPage.css';
import PasswordChangeButton from "./PasswordChangButton";
import LoginChangeButton from "./LoginIdChangeButton";

const MemberInfo = (props) => {
    const navigate = useNavigate();

    const [ memberData, setMemberData ] = useState(null);
    const [ curPwd, setCurPwd ] = useState("");
    const [ newPwd, setNewPwd ] = useState("");
    const [ newPwdCon, setNewPwdCon ] = useState("");

    const [ newLoginId, setNewLoginId ] = useState("");

    const [ loginIdChange, setLoginIdChange ] = useState(false);
    const [ loginIdChangeTitle, setLoginIdChangeTitle ] = useState("변경하기")
    const [ loginChangeError, setLoginChangeError ] = useState(null);

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
                setMemberData(response.data); // 멤버 데이터 넣기
            } catch (error) {
                console.log(error);
                alert("유저를 검증할 수 없습니다.");
                navigate('/'); // 만약 잘못된 토큰 제시로 보안상 문제가 있으면 홈 화면으로 이동
            }
        }

        fetchMemberData();
    }, []);

    const loginIdChangeBtn = () => {
        if (loginIdChange) {
            setLoginIdChange(false);
            setLoginIdChangeTitle("변경하기");
        } else {
            setLoginIdChange(true);
            setLoginIdChangeTitle("변경취소");
            setLoginChangeError(null);

        }
    };

    const fetchLoginIdError = (error) => {
        setLoginChangeError(error);
    };


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
                            <td>
                                <div style={{marginBottom:"15px"}}>
                                    {memberData ? memberData.loginId : ""} <Button onClick={loginIdChangeBtn}>{loginIdChangeTitle}</Button>
                                </div>

                                {loginIdChange &&
                                    <>
                                        <div style={{display: "flex"}}>
                                            <input className="form-control" 
                                            onChange={(e) => setNewLoginId(e.target.value)}
                                            style={{width: "auto", marginRight: "10px"}} />
                                            <LoginChangeButton 
                                                newLoginId={newLoginId}
                                                onChangeError={fetchLoginIdError}
                                            />
                                        </div>

                                        {loginChangeError && 
                                            <div style={{marginTop: "15px"}}>
                                                <p style={{color: "red"}}>{loginChangeError.newLoginId}</p>
                                            </div>
                                        }

                                    </>
                                }
                            </td>
                        </tr>

                        <tr>
                            <td>이메일</td>
                            <td>{memberData && memberData.email} <Button>변경</Button></td>
                        </tr>



                        {/* 이름 변경 */}        
                        <tr>
                            <td>이름</td>
                            <td>{memberData && memberData.name}</td>
                        </tr>
                        {/* 휴대폰 번호 변경 */}

                        <tr>
                            <td>휴대폰 번호</td>
                            <td>{memberData && memberData.phoneNum}</td>
                        </tr>

                        <tr>
                            <td>비밀번호 변경</td>
                            <td>
                                {/* 비밀번호 변경 */}
                                <Table className="pwdChangeT" style={{marginBottom: "0px"}}>
                                    <tbody>
                                        <tr>
                                            <th>현재 비밀번호</th>
                                            <td>
                                                <input className="form-control pwdChangeI" type="password"
                                                onChange={(e) => setCurPwd(e.target.value)} />
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <th>새 비밀번호</th>
                                            <td>
                                                <input className="form-control pwdChangeI" type="password"
                                                onChange={(e) => setNewPwd(e.target.value)} />
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <th>비밀번호 확인</th>
                                            <td>
                                                <input className="form-control pwdChangeI" type="password"
                                                onChange={(e) => setNewPwdCon(e.target.value)} />
                                            </td>
                                            
                                        </tr>

                                        <tr>
                                            <td style={{border: "none"}}></td>
                                            <td style={{border: "none"}}>
                                                <PasswordChangeButton
                                                    curPwd={curPwd}
                                                    newPwd={newPwd}
                                                    newPwdCon={newPwdCon}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                    
                                </Table>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <span style={{display: "block"}}>{memberData && memberData.address.zipcode}</span>
                                <span style={{display: "block"}}>{memberData && memberData.address.street}</span>
                                <span style={{display: "block"}}>{memberData && memberData.address.detailedAddress}</span>
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
