import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const EmailChangeButton = (props) => {

    const { email, setError, setMemberData, setEmailCodeIsSent, emailCodeIsSent} = props;
    const navigate = useNavigate();

    var buttonTitle = emailCodeIsSent ? "인증 재요청" : "인증요청";

    const submitmailChange = async () => {
        
        try {
            const response = await axios.post('http://localhost:8080/member/email/auth', 
                { email: email },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                }
            );

            console.log("이메일 변경 요청 응답 : ", response);
            setEmailCodeIsSent(true);
            // navigate(0);

        } catch (error) {
            console.error("이메일 변경 오류 : ", error.response.data);
            setError(error.response.data);
        }
    };


    return (
        <Button type="button" onClick={submitmailChange} style={{whiteSpace: "nowrap"}}>
            {buttonTitle}
        </Button>
    );
};

export default EmailChangeButton;