import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category2Depth from "./Category2Depth";
import '../../../css/categoryNav.css';

const CategoryNav = () => {

    const [ category, setCategory ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/major', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
                });

                console.log("카테고리 응답 데이터 : ", response.data);
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


    const categoryOnMouseEnter = (event) => {
        if ((event.target.tagName == "LI")) {
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

    return (
        <div className="category_nav" id="category">
                 
            <ul className="category_list" role="menu">

                {category.map((item, index) => ( 
                    <li id={`category${index}`} className="category_list_item" key={item.categoryId} 
                    onMouseEnter={(e) => {categoryOnMouseEnter(e)}} 
                    onMouseLeave={(e) => {categoryOnMouseLeave(e)}}>

                        <a className="category_btn" href="#">{item.categoryName}</a>

                        {/* className = category_2depth */}
                        <Category2Depth 
                            categoryId={item.categoryId}
                            children={item.children}
                        />
                    </li>
                ))}

            </ul>
        </div>
    );

};

export default CategoryNav;