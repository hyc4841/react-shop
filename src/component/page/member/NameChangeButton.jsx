import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberData } from "../../../redux/reducer/userSlice";

const NameChangeButton = (props) => {

    const { newName, onChangeError } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitNameChange = async () => {
        try {
            dispatch(getMemberData());

            /*
            const response = await axios.post('http://localhost:8080/member/name',
            { newName },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
                
        );

        console.log(response.data);
        fetchMemberData(response.data.memberInfo);
        alert("이름이 성공적으로 변경되었습니다");
        */
        navigate(0);
        } catch (error) {
            onChangeError(error.response.data);
            console.log(error.response);
        }

    };


    return (
        <Button type="button" onClick={submitNameChange}>변경하기</Button>
    );
};

export default NameChangeButton;