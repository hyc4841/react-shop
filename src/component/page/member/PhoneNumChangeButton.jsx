import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PhoneNumChangeButton = (props) => {
    const navigate = useNavigate();

    const { newPhoneNum, onChangeError, fetchMemberData } = props
    
    const submitPhoneNumChange = async () => {

        try {
            const response = await axios.post('http://localhost:8080/member/phone-num', 
                { newPhoneNum },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                }
            );
    
            fetchMemberData(response.data.memberInfo);
            console.log(response.data);
            alert("전화번호 변경 성공");
            navigate('/mypage/info');
        } catch (error) {
            console.log(error.response);
            onChangeError(error.response.data);
        }
    }


    return (

        <Button type="button" onClick={submitPhoneNumChange}>변경하기</Button>
    );
};

export default PhoneNumChangeButton;