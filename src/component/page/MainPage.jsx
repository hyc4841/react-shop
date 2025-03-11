import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import WriteButton from "../ui/Button";
import data from '../../data.json';
import axios from "axios";

import Category2Depth from "./item/Category2Depth";

import "../../css/categoryNav.css";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;


function MainPage(props) {
    const {} = props;

    const navigate = useNavigate();

    const [ category, setCategory ] = useState([]);

    const [ isLocked, setIsLocked ] = useState(false);

    const categoryOnMouseEnter = (event) => {

        if (!isLocked && (event.target.tagName == "LI")) {
            event.target.classList.add('active');
        }
        /*
        setIsLocked(true);
            // 해당 요소 active 설정
            timeoutId = setTimeout(() => {
                setIsLocked(false);
            }, 200);
        */
    };

    const categoryOnMouseLeave = (event) => {
        // 이렇게 하면 컴퓨터 상태에 따라서 부담이 갈수도 있겠지만 지금은 이게 훨씬 자연스러움
        const items = document.querySelectorAll('.category_list_item');
        items.forEach(item => {
            item.classList.remove('active');
        })
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/major', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
                });

                console.log(response);
                setCategory(response.data); // 카테고리 저장
            } catch (error) {
                if (error.status == 403) {
                    alert("카테고리를 가져오지 못함");
                    navigate('/');
                } else if (error.status == 401) {
                    alert("카테고리를 가져오지 못함");
                    navigate('')
                }

                console.log(error);
                alert("유저를 검증할 수 없습니다.");
                navigate('/'); // 만약 잘못된 토큰 제시로 보안상 문제가 있으면 홈 화면으로 이동
            }
        }

        fetchCategory();
    }, []);

    return (
        
            <Container className="d-flex">

                <div className="catetory text-center" id="category">
                    <ul className="category_list" role="menu">
                        {category.map((item, index) => ( 

                            <li id={`category${index}`} className="category_list_item" key={item.categoryId} 
                            onMouseEnter={(e) => {categoryOnMouseEnter(e)}} 
                            onMouseLeave={(e) => {categoryOnMouseLeave(e)}}>

                                <a href="#">{item.categoryName}</a>

                                {/* className = category_2depth */}
                                <Category2Depth 
                                    categoryId={item.categoryId}
                                    children={item.children}
                                />

                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    
                </div>
                
            </Container>
       
    );
}

export default MainPage;