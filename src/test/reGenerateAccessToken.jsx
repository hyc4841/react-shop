import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const ReGenerateAccessToken = () => {

    var accessToken;

    const axiosIns = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    const generate = async () => {
        try {
            // 만료된 엑세스 토큰을 서버로 들고 가는것
            console.log("리프레시 토큰으로 엑세스 토큰 재발급 받기 테스트");
            const response = await axiosIns.get('/refresh');

            console.log(response.headers['access-token']);

            accessToken = response.headers['access-token']

            localStorage.setItem('accessToken', accessToken);
            
            
        } catch (err) {
            console.error(err);
        } finally {
            console.log(accessToken);
        }
    }

    return (
        <Button onClick={generate}>
            토큰 재발급 받기
        </Button>
    )

};

export default ReGenerateAccessToken;
