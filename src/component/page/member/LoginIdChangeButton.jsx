import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginChangeButton = (props) => {

    const { newLoginId, onChangeError, fetchMemberData } = props;
    const navigate = useNavigate();

    const submitLoginIdUpdate = async () => {
        console.log("newLoginId : " + newLoginId);

        try {
            const response = await axios.post('http://localhost:8080/member/id', 
                { newLoginId }, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log(response);
            alert("아이디가 성공적으로 변경 되었습니다.");
            fetchMemberData(response.data.memberInfo);
            navigate(0);
        } catch (error) {
            onChangeError(error.response.data);
            console.log(error.response.data);
        }
    };


    return (
        <Button type="button" onClick={submitLoginIdUpdate}>
            변경
        </Button>

    );
};

export default LoginChangeButton;