import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberData } from "../../../redux/reducer/userSlice";

const LoginChangeButton = (props) => {

    const { newLoginId, onChangeError } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitLoginIdUpdate = async () => {
        console.log("newLoginId : " + newLoginId);

        try {
            dispatch(getMemberData());
            /*

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
            */
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