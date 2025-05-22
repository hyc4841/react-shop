import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginIdChgError } from "../../../../redux/reducer/userSlice";
import { Button, Form } from "react-bootstrap";
import EmailChangeButton from "../EmailChangeButton";
import UpdateEmailCodeSubmitbutton from "../UpdateEmailCodeSubmitButton";

const Email = (props) => {

    const dispatch = useDispatch();

    const { memberData } = props

    const [ buttonTitle, setButtonTitle ] = useState("변경하기");
    const [ inputIsVisible, setInputIsVisible ] = useState(false);
    const [ newEmail, setNewEmail ] = useState('');
    const [ isSentCode, setIsSentCode ] = useState(false);
    const [ code, setCode ] = useState('');
    
    const [ error, setError ] = useState('');

    const chgButtonHandler = () => {
            if (inputIsVisible) {
                setInputIsVisible(false);
                setButtonTitle("변경하기");
            } else {
                setInputIsVisible(true);
                setButtonTitle("변경취소");
                dispatch(setLoginIdChgError());
            }
        };

    return (
        <div>
            <div className="member-info d-flex justify-content-between">
                {memberData && memberData.email} <Button type="button" onClick={chgButtonHandler}>{buttonTitle}</Button>
            </div>
            
            {inputIsVisible && 
                <>
                    <div className="input-area">

                        <Form.Control type="email" onChange={(e) => setNewEmail(e.target.value)} placeholder="이메일을 입력해주세요" />

                        {/* 인증 코드 요청 버튼 */}
                        <EmailChangeButton
                            email={newEmail}
                            setError={setError}
                            setIsSentCode={setIsSentCode}
                            isSentCode={isSentCode}
                        />
                    </div>

                    {isSentCode && (
                        <> 
                            <div>
                                <p style={{color: "blue"}}>인증 코드를 전송했습니다.</p>
                            </div>

                            <div className="d-flex">
                                <Form.Control type="text" onChange={(e) => setCode(e.target.value)}
                                value={code}  placeholder="코드를 입력해주세요"/>

                                <UpdateEmailCodeSubmitbutton
                                    email={newEmail}
                                    code={code}
                                    setError={setError}
                                />
                            </div>
                        </>
                    )}

                    {/* 인증 코드에 대한 예외 */}
                    {error.code &&   
                        <div className="error-field">
                            {error.code.map((error, index) => (
                                <p key={error.id}>※ {error.message}</p>
                            ))}
                        </div>    
                    }

                    {/* 이메일에 대한 예외 */}
                    {error.email &&   
                        <div className="error-field">
                            {error.email.map((error, index) => (
                                <p key={error.id}>※ {error.message}</p>
                            ))}
                        </div>    
                    }
                </>
            }
        </div>
    );
};

export default Email;