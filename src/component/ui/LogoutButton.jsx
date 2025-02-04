import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout, logoutFetch } from "../../redux/reducer/userSlice";

import { StyledNavItem } from "../style/header/headrStyle";


const LogoutButton = (props) => {
    const { title } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /*
    const axiosIns = axios.create({
        baseURL: 'http://localhost:8080', // 기본 url 설정
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    */

    const logout = async () => {
        try {
            console.log("로그아웃 요청");
            // const response = await axiosIns.post('/logout');

            // isLoggedIn : false 로
            dispatch(logoutFetch()); // redux 사용

            navigate("/");
        } catch (err) {
            console.error("로그아웃 실패? : " + err);
        }
    }

    return (
        <StyledNavItem onClick={logout}>
            {title || "button"}
        </StyledNavItem>
    )
}

export default LogoutButton;