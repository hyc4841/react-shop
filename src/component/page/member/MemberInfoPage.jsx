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
import NameChangeButton from "./NameChangeButton";
import DaumPostModal from "../signup/DaumPostModal";
import AddressChangeButton from "./AddressChangeButton";

const MemberInfo = (props) => {
    const navigate = useNavigate();

    const [ memberData, setMemberData ] = useState(null);
    const [ curPwd, setCurPwd ] = useState("");
    const [ newPwd, setNewPwd ] = useState("");
    const [ newPwdCon, setNewPwdCon ] = useState("");

    const [ newLoginId, setNewLoginId ] = useState("");
    const [ newEmail , setNewEmail ] = useState("");
    const [ newPhoneNum, setNewPhoneNum ] = useState("");
    const [ newName, setNewName ] = useState("");
    
    // 이거 중복 없애기
    const [ loginIdChgIsVisible, setLoginIdChgIsVisible ] = useState(false); // 아이디 변경 버튼 플레그
    const [ loginIdChgTitle, setLoginIdChgTitle ] = useState("변경하기");
    const [ loginChgError, setLoginChgError ] = useState("");

    const [ emailChgIsVisible, setEmailChgIsVisible ] = useState(false); // 이메일 변경 버튼 플레그
    const [ emailChgTitle, setEmailChgTitle ] = useState("변경하기"); // 변경 버튼 텍스트
    const [ emailChgError, setEmailChgError ] = useState("");

    const [ phoneNumChgIsVisible, setPhoneNumChgIsVisible ] = useState(false); // 이메일 변경 버튼 플레그
    const [ phoneNumChgTitle, setPhoneNumChgTitle ] = useState("변경하기"); // 변경 버튼 텍스트
    const [ phoneNumChgError, setPhoneNumChgError ] = useState("");

    const [ nameChgIsVisible, setNameChgIsVisible ] = useState(false);
    const [ nameChgTitle, setNameChgTitle ] = useState("변경하기");
    const [ nameChgError, setNameChgError ] = useState("");

    const [ passwordChgError, setPasswordChgError ] = useState("");

    const [ addressChgIsVisible, setAddressChgIsVisible ] = useState(false);

    const [ modalOnOff, setModalOnOff ] = useState(false);
    const [ newZipcode, setNewZipcode ] = useState("");
    const [ newCity, setNewCity ] = useState("");
    const [ newStreet, setNewStreet ] = useState("");
    const [ newDetailedAddress, setNewDetailedAddress ] = useState("");
    const [ addressChgError, setAddressChgError ] = useState("");

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
                if (error.status == 403) {
                    alert("접근 권한이 없는 유저입니다.");
                    navigate('/');
                } else if (error.status == 401) {
                    alert("로그인이 필요한 화면입니다.");
                    navigate('')
                }

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

    const nameChangeBtn = () => {
        if (nameChgIsVisible) {
            setNameChgIsVisible(false);
            setNameChgTitle("변경하기");
        } else {
            setNameChgIsVisible(true);
            setNameChgTitle("변경취소");
            setNameChgError(null);
        }
    };

    const addressChangeBtn = () => {
        setModalOnOff(true);
    }

    console.log(passwordChgError);
    
    
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
                                                onChangeError={setLoginChgError}
                                                fetchMemberData={setMemberData}
                                            />
                                        </div>

                                        {loginChgError && 
                                            <div style={{marginTop: "10px"}}>
                                                {loginChgError.newLoginId.map((error, index) => (
                                                    <p key={error.id} style={{color: "red", marginBottom: "0px"}}>※ {error.message}</p>
                                                ))}
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
                                            <>
                                                
                                                <div style={{marginTop: "10px"}}>
                                                    {emailChgError.newEmail.map((error, index) => (
                                                        <p key={error.id} style={{color: "red", marginBottom: "0px"}}>※ {error.message}</p>
                                                    ))}
                                                    
                                                </div>
                                            </>

                                            
                                        
                                        }
                                    </>
                                }
                                
                            
                            </td>
                        </tr>

                        {/* 이름 변경 */}        
                        <tr>
                            <td>이름</td>
                            <td>
                                <div>
                                    {memberData && memberData.name} <Button onClick={nameChangeBtn}>{nameChgTitle}</Button>
                                </div>

                                {nameChgIsVisible && 
                                    <>
                                    
                                        <div style={{display: "flex", marginTop: "15px"}}>
                                            <input className="form-control" onChange={(e) => setNewName(e.target.value)}
                                            style={{width: "auto", marginRight: "10px"}} />
                                            <NameChangeButton 
                                                newName={newName}
                                                onChangeError={setNameChgError}
                                                fetchMemberData={setMemberData}
                                            />
                                        </div>

                                        {nameChgError && 
                                            <div style={{marginTop: "10px"}}>

                                                {nameChgError.newName.map((error, index) => (
                                                    <p key={error.id} style={{color: "red", marginBottom: "0px"}}>※ {error.message}</p>
                                                ))}
                                                
                                            </div>
                                        }
                                    </>
                                }

                                
                            </td>
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

                                                {phoneNumChgError.newPhoneNum.map((error, index) => (
                                                    <p key={error.id} style={{color: "red", marginBottom: "0px"}}>※ {error.message}</p>
                                                ))}

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
                                            <th style={{paddingTop: "0px"}}>현재 비밀번호</th>
                                            <td style={{paddingTop: "0px"}}>
                                                <input className="form-control pwdChangeI" type="password"
                                                onChange={(e) => setCurPwd(e.target.value)} />

                                                {passwordChgError.curPwd && 
                                                    <>
                                                        <div>

                                                            {passwordChgError.curPwd.map((error, index) => (
                                                                <p key={error.id} style={{color: "red", marginBottom: "0px"}}>※ {error.message}</p>
                                                            ))}

                                                        </div>
                                                    </>
                                                }
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <th style={{paddingTop: "0px"}}>새 비밀번호</th>
                                            <td style={{paddingTop: "0px"}}>
                                                <input className="form-control pwdChangeI" type="password"
                                                onChange={(e) => setNewPwd(e.target.value)} />

                                                {passwordChgError.newPwd && 

                                                    <>
                                                        <div>

                                                            {passwordChgError.newPwd.map((error, index) => (
                                                                <p key={error.id} style={{color: "red", marginBottom: "0px"}}>※ {error.message}</p>
                                                            ))}

                                                        </div>
                                                    </>
                                                }
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <th style={{paddingTop: "0px"}}>비밀번호 확인</th>
                                            <td style={{paddingTop: "0px"}}>
                                                <input className="form-control pwdChangeI" type="password"
                                                onChange={(e) => setNewPwdCon(e.target.value)} />

                                                {passwordChgError.newPwdCon &&

                                                    <>
                                                        <div>

                                                            {passwordChgError.newPwdCon.map((error, index) => (
                                                                <p key={error.id} style={{color: "red", marginBottom: "0px"}}>※ {error.message}</p>
                                                            ))}

                                                        </div>
                                                    </>
                                                    
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
                                {/* 주소 수정중 */}
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


/*
    <div>
        <span style={{display: "block"}}>{memberData && memberData.address.zipcode}</span>
        <span style={{display: "block"}}>{memberData && memberData.address.street}</span>
        <span style={{display: "block"}}>{memberData && memberData.address.detailedAddress}</span>
    </div>

    <div style={{marginTop: "10px"}}>
        <Container>
            <Row xs={2}>
                <Col xs={3} style={{paddingLeft: "0px", marginTop: "5px"}}>
                    <input className="form-control" value={newZipcode} readOnly />
                </Col>

                <Col xs={3} style={{paddingLeft: "0px", marginTop: "5px"}}>
                    <Button type="button" style={{width: "100%"}} onClick={() => addressChangeBtn()}>주소 찾기</Button>
                </Col>
            </Row>

            <Row xs={1}>
                <Col xs={8} style={{paddingLeft: "0px", marginTop: "5px"}}>
                    <input className="form-control" value={newStreet} readOnly />
                    <div>
                        {addressChgError.newStreet &&
                            <>
                                {addressChgError.newStreet.map((error, index) => (
                                    <p key={error.id} style={{color: "red", marginBottom: "5px"}}>※ {error.message}</p>
                                ))}
                            </>
                        }

                    </div>
                </Col>
            </Row>
            <Row xs={1}>
                <Col xs={8} style={{paddingLeft: "0px", marginTop: "5px"}}>
                    <input className="form-control" onChange={(e) => setNewDetailedAddress(e.target.value)} />
                    <div style={{marginBottom: "10px"}}>
                        {addressChgError &&
                            <>
                                {addressChgError.newDetailedAddress.map((error, index) => (
                                    <p key={error.id} style={{color: "red", marginBottom: "5px"}}>※ {error.message}</p>
                                ))}
                            </>
                        }
                    </div>
                </Col>
            </Row>                            
        </Container>

        </div>
        <div style={{marginTop: "0px"}}>
            <AddressChangeButton
                newCity={newCity}
                newStreet={newStreet}
                newZipcode={newZipcode}
                newDetailedAddress={newDetailedAddress}
                fetchMemberData={setMemberData}
                onChangeError={setAddressChgError}
            /> 
        </div>
        <DaumPostModal
            modalOnOff={modalOnOff}
            setModalOnOff={setModalOnOff}
            setZipcode={setNewZipcode}
            setCity={setNewCity}
            setStreet={setNewStreet}
        />

*/

}

export default MemberInfo;
