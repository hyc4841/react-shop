import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const EmailChangeButton = (props) => {

    const { newEmail, onChangeError, fetchMemberData } = props;
    const navigate = useNavigate();

    const submitmailChange = async () => {
        
        try {
            const response = await axios.post('http://localhost:8080/member/email', 
                { newEmail },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                }
            );

            console.log(response);
            alert("이메일 변경 성공");
            fetchMemberData(response.data.memberInfo);
            navigate(0);
        } catch (error) {
            console.log(error.response);
            // 오류 발생시 처리
            onChangeError(error.response.data);
        }
    };


    return (
        <Button type="button" onClick={submitmailChange}>
            이메일 변경
        </Button>
    );
};

export default EmailChangeButton;