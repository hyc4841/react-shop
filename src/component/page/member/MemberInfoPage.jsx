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
import EmailChangeButton from "./EmailChangeButton";
import PhoneNumChangeButton from "./PhoneNumChangeButton";

const MemberInfo = (props) => {
    const navigate = useNavigate();

    const [ memberData, setMemberData ] = useState(null);
    const [ curPwd, setCurPwd ] = useState("");
    const [ newPwd, setNewPwd ] = useState("");
    const [ newPwdCon, setNewPwdCon ] = useState("");

    const [ newLoginId, setNewLoginId ] = useState("");
    const [ newEmail , setNewEmail ] = useState("");
    const [ newPhoneNum, setNewPhoneNum ] = useState("");
    
    // 이거 중복 없애기
    const [ loginIdChgIsVisible, setLoginIdChgIsVisible ] = useState(false); // 아이디 변경 버튼 플레그
    const [ loginIdChgTitle, setLoginIdChgTitle ] = useState("변경하기");
    const [ loginChgError, setLoginChgError ] = useState(null);

    const [ emailChgIsVisible, setEmailChgIsVisible ] = useState(false); // 이메일 변경 버튼 플레그
    const [ emailChgTitle, setEmailChgTitle ] = useState("변경하기"); // 변경 버튼 텍스트
    const [ emailChgError, setEmailChgError ] = useState(null);

    const [ phoneNumChgIsVisible, setPhoneNumChgIsVisible ] = useState(false); // 이메일 변경 버튼 플레그
    const [ phoneNumChgTitle, setPhoneNumChgTitle ] = useState("변경하기"); // 변경 버튼 텍스트
    const [ phoneNumChgError, setPhoneNumChgError ] = useState(null);

    const [ passwordChgError, setPasswordChgError ] = useState("")

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
        if (loginIdChgIsVisible) {
            setLoginIdChgIsVisible(false);
            setLoginIdChgTitle("변경하기");
        } else {
            setLoginIdChgIsVisible(true);
            setLoginIdChgTitle("변경취소");
            setLoginChgError(null);

        }
    };

    const emailChangeBtn = () => {
        if (emailChgIsVisible) {
            setEmailChgIsVisible(false);
            setEmailChgTitle("변경하기");
        } else {
            setEmailChgIsVisible(true);
            setEmailChgTitle("변경취소");
            setEmailChgError(null);

        }
    };

    const phoneNumChangeBtn = () => {
        if (phoneNumChgIsVisible) {
            setPhoneNumChgIsVisible(false);
            setPhoneNumChgTitle("변경하기");
        } else {
            setPhoneNumChgIsVisible(true);
            setPhoneNumChgTitle("변경취소");
            setPhoneNumChgError(null);
        }
    };

    const fetchLoginIdError = (error) => {
        setLoginChgError(error);
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

                        {/* 아이디 변경 */}
                        <tr>
                            <td>아이디</td>
                            <td>
                                <div>
                                    {memberData ? memberData.loginId : ""} <Button onClick={loginIdChangeBtn}>{loginIdChgTitle}</Button>
                                </div>

                                {loginIdChgIsVisible &&
                                    <>
                                        <div style={{display: "flex", marginTop: "15px"}}>
                                            <input className="form-control" type="text"
                                            onChange={(e) => setNewLoginId(e.target.value)}
                                            style={{width: "auto", marginRight: "10px"}} />
                                            <LoginChangeButton 
                                                newLoginId={newLoginId}
                                                onChangeError={fetchLoginIdError}
                                                fetchMemberData={setMemberData}
                                            />
                                        </div>

                                        {loginChgError && 
                                            <div style={{marginTop: "10px"}}>
                                                <p style={{color: "red", marginBottom: "0px"}}>{loginChgError.newLoginId}</p>
                                            </div>
                                        }

                                    </>
                                }
                            </td>
                        </tr>

                        {/* 이메일 변경 */}
                        <tr>
                            <td>이메일</td>
                            <td>
                                <div>
                                    {memberData && memberData.email} <Button type="button" onClick={emailChangeBtn}>{emailChgTitle}</Button>
                                </div>
                                
                                {emailChgIsVisible && 
                                    <>
                                        <div style={{display: "flex", marginTop: "15px"}}>

                                            <input className="form-control" type="email" onChange={(e) => setNewEmail(e.target.value)}
                                            style={{width: "auto", marginRight: "10px"}} />

                                            <EmailChangeButton
                                                newEmail={newEmail}
                                                onChangeError={setEmailChgError}
                                                fetchMemberData={setMemberData}
                                            />
                                        </div>

                                        {emailChgError && 
                                            <div style={{marginTop: "10px"}}>
                                                <p style={{color: "red", marginBottom: "0px"}}>{emailChgError.newEmail}</p>
                                            </div>
                                        
                                        }
                                    </>
                                }
                                
                            
                            </td>
                        </tr>

                        {/* 이름 변경 */}        
                        <tr>
                            <td>이름</td>
                            <td>{memberData && memberData.name} <Button>변경하기</Button></td>
                        </tr>


                        {/* 휴대폰 번호 변경 */}
                        <tr>
                            <td>휴대폰 번호</td>
                            <td>
                                <div>
                                    {memberData && memberData.phoneNum} <Button type="button" onClick={phoneNumChangeBtn}>{phoneNumChgTitle}</Button>
                                </div>
                            
                                {phoneNumChgIsVisible && 
                                    <>
                                        <div style={{display: "flex", marginTop: "15px"}}>

                                            <input className="form-control" type="text" onChange={(e) => setNewPhoneNum(e.target.value)}
                                            style={{width: "auto", marginRight: "10px"}}/>
                                            <PhoneNumChangeButton
                                                newPhoneNum={newPhoneNum}
                                                onChangeError={setPhoneNumChgError}
                                                fetchMemberData={setMemberData}
                                            />
                                        </div>

                                        {phoneNumChgError && 
                                            <div style={{marginTop: "10px"}}>
                                                <p style={{color: "red", marginBottom: "0px"}}>{phoneNumChgError.newPhoneNum}</p>
                                            </div>
                                        }
                                    </>
                                    
                                }
                                
                            </td>
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

                                                {passwordChgError.curPwd && 
                                                    <div>
                                                        <p style={{color: "red", marginBottom: "0px"}}>{passwordChgError.curPwd}</p>
                                                    </div>
                                                }
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <th>새 비밀번호</th>
                                            <td>
                                                <input className="form-control pwdChangeI" type="password"
                                                onChange={(e) => setNewPwd(e.target.value)} />

                                                {passwordChgError.newPwd && 
                                                    <div>
                                                        <p style={{color: "red", marginBottom: "0px"}}>{passwordChgError.newPwd}</p>
                                                    </div>
                                                }
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <th>비밀번호 확인</th>
                                            <td>
                                                <input className="form-control pwdChangeI" type="password"
                                                onChange={(e) => setNewPwdCon(e.target.value)} />

                                                {passwordChgError.newPwdCon && 
                                                    <div>
                                                        <p style={{color: "red", marginBottom: "0px"}}>{passwordChgError.newPwdCon}</p>
                                                    </div>
                                                }
                                            </td>
                                            
                                        </tr>

                                        <tr>
                                            <td style={{border: "none"}}></td>
                                            <td style={{border: "none"}}>
                                                <PasswordChangeButton
                                                    curPwd={curPwd}
                                                    newPwd={newPwd}
                                                    newPwdCon={newPwdCon}
                                                    onChangeError={setPasswordChgError}
                                                    fetchMemberData={setMemberData}
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
