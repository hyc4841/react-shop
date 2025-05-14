import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberData } from "../../../redux/reducer/userSlice";

const UpdateEmailCodeSubmitbutton = (props) => {

    const { email, code, setError} = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitEmailCode = async () => {
        
        try {
            const response = await axios.post('http://localhost:8080/member/email/auth/confirm', 
                { email: email, code: code},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                });
                console.log("이메일 인증 요청 응답 : ", response);

                updateEmail(); // 이메일 인증에 성고하면 바로 이메일 수정으로 요청보냄
                

        } catch (error) {
            console.error(error);
            setError(error.response.data);
        }
    };


    const updateEmail = async () => {

        try {
            dispatch(getMemberData());
            /*
            const response = await axios.post('http://localhost:8080/member/email',
                { newEmail: email },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                });

                console.log("이메일 업데이트 성공 : ", response);
                setMemberData(response.data);
                alert("이메일 수정에 성공했습니다");
                navigate(0); // 페이지 새로고침
                */
        } catch (error) {
            console.error(error);
        }

    };


    return (
        <Button onClick={submitEmailCode} style={{whiteSpace: "nowrap", marginLeft: "15px"}}>
            인증하기
        </Button>
    );
};

export default UpdateEmailCodeSubmitbutton;

