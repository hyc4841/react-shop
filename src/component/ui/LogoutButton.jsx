import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout, logoutFetch } from "../../redux/reducer/userSlice";


const LogoutButton = (props) => {

    const dispatch = useDispatch();

    const axiosIns = axios.create({
        baseURL: 'http://localhost:8080', // 기본 url 설정
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    const { title } = props;

    const navigate = useNavigate();

    const logout = async () => {
        try {
            console.log("로그아웃 요청");
            // const response = await axiosIns.post('/logout');

            // isLoggedIn : false 로
            dispatch(logoutFetch());

            navigate("/");
        } catch (err) {
            console.error("로그아웃 실패? : " + err);
        }
    }

    return (
        <Button onClick={logout}>
            {title || "button"}
        </Button>
    )
}

export default LogoutButton;