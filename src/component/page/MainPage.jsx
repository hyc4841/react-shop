import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import WriteButton from "../ui/Button";
import data from '../../data.json';
import axios from "axios";

import Category2Depth from "./item/Category2Depth";

import "../../css/categoryNav.css";
import "../../css/mainPage.css"
import { Container } from "react-bootstrap";
import CategoryNav from "./item/CategoryNav";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


function MainPage(props) {
    const {} = props;

    return (
        
            <Container className="wrapper">

                {/* 카테고리 네비게이션*/}
                <CategoryNav />
                
                {/* 메인페이지 컨텐츠 */}
                <div>
                    
                </div>
                
            </Container>
       
    );
}

export default MainPage;