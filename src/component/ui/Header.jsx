import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <a href="/">홈</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="/board">게시판</a>
            <hr/>
        </header>
    );
};

export default Header;