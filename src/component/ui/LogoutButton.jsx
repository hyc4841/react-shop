import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = (props) => {

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

    var data = {
        message: "로그아웃 테스트"
    }

    var config = {
        headers: {
            
            'Authorization': localStorage.getItem('accessToken')
        }
    };

    const logout = async () => {
        try {
            console.log("로그아웃 요청");
            const response = await axiosIns.post('/logout');
            localStorage.removeItem('accessToken');
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