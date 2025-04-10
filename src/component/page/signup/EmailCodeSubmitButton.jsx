import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

// 이메일 인증 코드 제출 버튼
const EmailCodeSubmitButton = (props) => {

    const { email, code, setError, setIsEmailCertificated, setEmailCodeisSent } = props; 

    const submitCode = async () => {

        try {
            const response = await axios.post('http://localhost:8080/signup/auth/email/confirm', 
                {
                    email: email,
                    code: code
                },
            {withCredentials: true});
            console.log("코드 인증 응답 : " + response.data);
            setIsEmailCertificated(true);
            setEmailCodeisSent(false);

        } catch (e) {
            setError(e.response.data);
            console.error(e.response.data);
        }  
    }


    return (
        <Button onClick={submitCode} style={{whiteSpace: "nowrap", marginLeft: "15px"}}>
            인증하기
        </Button>
    );
};

export default EmailCodeSubmitButton;