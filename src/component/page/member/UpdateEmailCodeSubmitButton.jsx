import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailUpdate } from "../../../redux/reducer/userSlice";

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

                if (response.status == 200) {
                    dispatch(emailUpdate({ newEmail: email }));
                    alert("이메일 수정에 성공했습니다");
                    // navigate(0);
                }

        } catch (error) {
            console.error(error);
            setError(error.response.data);
        }
    };

    return (
        <Button onClick={submitEmailCode} style={{whiteSpace: "nowrap", marginLeft: "15px"}}>
            인증하기
        </Button>
    );
};

export default UpdateEmailCodeSubmitbutton;

