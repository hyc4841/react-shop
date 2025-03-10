import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import WriteButton from "../ui/Button";
import data from '../../data.json';
import axios from "axios";

import Category2Depth from "./item/Category2Depth";

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

const categoryOnMouseEnter = (e) => {
    // const { e, categoryId } = props;
    console.log("마우스 올림");
    console.log(e);

    e.target.classList.add('active');
    e.target.querySelector('.category_2depth').style.display = 'block';
        
};

const categoryOnMouseLeave = (e) => {
    // const { e, categoryId } = props;
    console.log("마우스 땜");

    e.target.querySelector('.category_2depth').style.display = 'none';
    e.target.classList.remove('active');
    
}



function MainPage(props) {
    const {} = props;

    const navigate = useNavigate();

    const [ category, setCategory ] = useState([]);
    const layerName = "";


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
        <Wrapper>
            <Container className="d-flex">

                <div className="catetory text-center" id="category">
                    <ul className="category_list" role="menu" style={{border: "1px solid black", borderRadius: "15px", listStyleType: "none", padding: "15px"}}>
                        {category.map((item, index) => ( 
                            <li key={item.categoryId} onMouseEnter={(e) => categoryOnMouseEnter(e)} onMouseLeave={(e) => categoryOnMouseLeave(e)}>
                                <a href="#" style={{textDecoration: "none"}}>{item.categoryName}</a>

                                <Category2Depth 
                                    categoryId={item.categoryId}
                                    children={item.children}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <WriteButton
                        title="글 작성하기"
                        onClick={() => {
                            navigate("/post-write");
                        }}
                    />
                    <PostList
                        posts={data}
                        onClickItem={(item) => {
                            navigate(`/post/${item.id}`);
                        }}
                    />
                </div>
                
            </Container>
        </Wrapper>
    );
}

export default MainPage;