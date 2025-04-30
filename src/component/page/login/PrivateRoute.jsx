import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const location = useLocation();
    const isLoggedIn = localStorage.getItem('accessToken');

    console.log("데이터 가져오기? : ", location.state);

    if (isLoggedIn == null) { // 로그인 안되어 있으면

        alert("로그인이 필요한 화면입니다. 로그인 페이지로 이동합니다.");

        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // 로그인 되어 있으면
    return children;
};

export default PrivateRoute;

// 이거 트러블 슈팅 거리다.
// 보호된 라우트 컴포넌트 생성.
// 이전 페이지로 이동시키기, 뒤로가기 안되도록 하기, 등등
// 인증 요청, 인증 요청 이후 라우팅에 대한 고민
