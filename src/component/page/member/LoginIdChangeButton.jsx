import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginIdUpdate } from "../../../redux/reducer/userSlice";

const LoginChangeButton = (props) => {

    const { newLoginId } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitLoginIdUpdate = async () => {
    
        const resultAction = await dispatch(loginIdUpdate({ newLoginId: newLoginId }));

        if (loginIdUpdate.fulfilled.match(resultAction)) {
            alert("아이디가 성공적으로 변경되었습니다.");
            navigate(0);
        }
    };

    return (
        <Button type="button" onClick={submitLoginIdUpdate}>
            변경
        </Button>
    );
};

export default LoginChangeButton;