import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Table, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MypageNav from "./MyPageNav";
import PasswordChangeButton from "./PasswordChangButton";
import LoginChangeButton from "./LoginIdChangeButton";
import EmailChangeButton from "./EmailChangeButton";
import PhoneNumChangeButton from "./PhoneNumChangeButton";
import NameChangeButton from "./NameChangeButton";

import '../../../css/memberInfoPage.css';
import UpdateEmailCodeSubmitbutton from "./UpdateEmailCodeSubmitButton";
import MemberAddressModalContent from "./addressPortal/MemberAddressModalContent";
import { useDispatch, useSelector } from "react-redux";
import { getMemberData, setLoginIdChgError } from "../../../redux/reducer/userSlice";
import LoginId from "./memberInfo/LoginId";
import Email from "./memberInfo/Email";

const MemberInfo = (props) => {
    const navigate = useNavigate();

    const [ error, setError ] = useState('');

    // const [ memberData, setMemberData ] = useState(null);
    const { memberData, memberDataError } = useSelector(state => state.user);

    const [ curPwd, setCurPwd ] = useState("");
    const [ newPwd, setNewPwd ] = useState("");
    const [ newPwdCon, setNewPwdCon ] = useState("");

    const [ newLoginId, setNewLoginId ] = useState("");
    const [ email , setEmail ] = useState("");
    const [ emailCode, setEmailCode ] = useState('');

    const [ newPhoneNum, setNewPhoneNum ] = useState("");
    const [ newName, setNewName ] = useState("");
    
    // 이거 중복 없애기
    const [ loginIdChgIsVisible, setLoginIdChgIsVisible ] = useState(false); // 아이디 변경 버튼 플레그
    const [ loginIdChgTitle, setLoginIdChgTitle ] = useState("변경하기");

    const [ emailChgIsVisible, setEmailChgIsVisible ] = useState(false); // 이메일 변경 버튼 플레그
    const [ emailChgTitle, setEmailChgTitle ] = useState("변경하기"); // 변경 버튼 텍스트
    const [ emailChgError, setEmailChgError ] = useState("");

    const [ emailCodeIsSent, setEmailCodeIsSent ] = useState(false);


    const [ phoneNumChgIsVisible, setPhoneNumChgIsVisible ] = useState(false); // 이메일 변경 버튼 플레그
    const [ phoneNumChgTitle, setPhoneNumChgTitle ] = useState("변경하기"); // 변경 버튼 텍스트
    const [ phoneNumChgError, setPhoneNumChgError ] = useState("");

    const [ nameChgIsVisible, setNameChgIsVisible ] = useState(false);
    const [ nameChgTitle, setNameChgTitle ] = useState("변경하기");
    const [ nameChgError, setNameChgError ] = useState("");

    const [ passwordChgError, setPasswordChgError ] = useState("");
    const [ modalOnOff, setModalOnOff ] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getMemberData());

        if (memberDataError) {
            console.log("멤버 정보 가져오기 에러 : ", memberDataError);
            alert("로그인이 필요한 화면입니다.");
            navigate('/');
        }
        
    }, [memberDataError]);

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
                                <LoginId 
                                    memberData={memberData}
                                />
                            </td>
                        </tr>

                        {/* 이메일 변경 */}
                        <tr>
                            <td>이메일</td>
                            <td>
                                <Email
                                    memberData={memberData}
                                />
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
                            <td>
                                {memberData &&
                                    <MemberAddressModalContent
                                        addressList={memberData.address}
                                    />
                                }
                                <div id="portal-root"></div>
                            </td>
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
