import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberData } from "../../../redux/reducer/userSlice";

const PasswordChangeButton = (props) => {

    const { curPwd, newPwd, newPwdCon, onChangeError } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const submitPasswordChange = async () => {

        try {
            dispatch(getMemberData());
            /*
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
            */
            navigate(0);
        } catch (error) {

            onChangeError(error.response.data);
            console.error(error.response);

        }

    }

    return (
        <Button type="button" onClick={submitPasswordChange}>
            비밀번호 변경
        </Button>
    );
};

export default PasswordChangeButton;
