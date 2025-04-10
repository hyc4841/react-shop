import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

// 이메일 인증 코드 요청 버튼
const EmailCertificationButton = (props) => {

    const { email, emailCodeisSent, setEmailCodeisSent, setError, setEmailCodeReReq } = props;

    const buttonTitle = emailCodeisSent ? "다시 요청하기" :  "인증 요청";

    const submitEmail = async () => {
        try {

            const response = await axios.post("http://localhost:8080/signup/auth/email", 
                {email: email},
                {withCredentials: true});

                if (emailCodeisSent) { // 버튼 타이틀이 "다시 요청하기" 일때 누르면 인증 코드 재요청이므로 재요청 플레그를 true 로 만든다.
                    setEmailCodeReReq(true);
                }

                // 인증 요청이 되면 화면에선 인증 요청을 보냈다는 표시를 하고 인증 코드 입력창을 띄워줘야한다.
                setEmailCodeisSent(true);
                setError(''); // 이메일 인증 보내면 기존에 떠있던 오류 제거

                

            console.log("이메일 인증 요청 응답 : ", response);
        } catch (e) {
            setError(e.response.data);
            console.error("이메일 인증 오류 : ", e.response.data);
        }
    };
    

    return (
        <Button onClick={submitEmail} style={{whiteSpace: "nowrap", marginLeft: "15px"}}>
            {buttonTitle}
        </Button>
    );
};

export default EmailCertificationButton;