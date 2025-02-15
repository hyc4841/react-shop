import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const EmailChangeButton = (props) => {

    const { newEmail } = props;

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
            navigate('/');




        } catch (error) {
            console.log("이메일 변경 실패 : " + error);
            // 오류 발생시 처리


        }
    };


    return (
        <Button type="button" onClick={submitmailChange}>
            이메일 변경
        </Button>
    );
};

export default EmailChangeButton;