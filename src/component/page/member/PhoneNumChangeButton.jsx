import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberData } from "../../../redux/reducer/userSlice";

const PhoneNumChangeButton = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { newPhoneNum, onChangeError } = props
    
    const submitPhoneNumChange = async () => {

        try {
            dispatch(getMemberData());
            

            /*
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

            console.log(response.data);
            alert("전화번호 변경 성공");
            fetchMemberData(response.data.memberInfo);
            */
            navigate(0); // useNavigate(0)을 하면 페이지 새로고침이 된다!
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