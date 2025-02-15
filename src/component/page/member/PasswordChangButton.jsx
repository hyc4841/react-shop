import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PasswordChangeButton = (props) => {

    const { curPwd, newPwd, newPwdCon, fetchMemberData } = props;
    const navigate = useNavigate();
    
    const submitPasswordChange = async () => {

        try {
            const response = await axios.post('http://localhost:8080/member/password', 
                {curPwd, newPwd, newPwdCon},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });

            console.log(response);
            alert("비밀번호가 성공적으로 변경 되었습니다.");
            fetchMemberData(response.data.memberInfo);
            navigate('/mypage/info');
        } catch (error) {

            console.error("비밀번호 변경 오류 : " + error);
        }

    }

    return (
        <Button type="button" onClick={submitPasswordChange}>
            비밀번호 변경
        </Button>
    );
};

export default PasswordChangeButton;
