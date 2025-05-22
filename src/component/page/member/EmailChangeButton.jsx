import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailUpdate, getMemberData } from "../../../redux/reducer/userSlice";


const EmailChangeButton = (props) => {

    const { email, setError, setIsSentCode, isSentCode} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    var buttonTitle = isSentCode ? "인증 재요청" : "인증요청";

    console.log("변경 이메일 : ", email);

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
            setIsSentCode(true);
        } catch (error) {
            console.error("이메일 인증 요청 실패 : ", error);
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