import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CategoryNav from "./CategoryNav";
import ItemCard from "./ItemCard";

const ItemListPage = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const categoryId = query.get('category');

    const categories = [categoryId];
    const itemName = null;
    const morePrice = null;
    const lessPrice = null;

    const searchCond = {categories, itemName, morePrice, lessPrice};

    const [ items, setItems ] = useState([]);

    console.log(searchCond);

    // 나중에는 검색 태그 같은것들을 바디에 넣어서 조회

    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log("categoryId : " + categoryId)


                const response = await axios.get(`http://localhost:8080/items`, {
                    params: {
                        categories: categoryId,
                        itemName: itemName,
                        morePrice: morePrice,
                        lessPrice: lessPrice
                }},  
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
                });

                console.log("dfdfd");
                console.log(response.data);
                setItems(response.data);
                
                                                
            } catch (error) {
                console.log(error);
            }
        };

        fetchItems();
    }, []); // [] 이거 역할 다시 알기


    return (
        <Container className="d-flex">
            
            {/* 카테고리 네비게이션 */}
            <CategoryNav />
            
            {/* 상품 리스트 */}
            <div>
                {/* 상세검색 필터링 체크하는 곳 */}

                <ItemCard 
                    items={items}
                />
            </div>
            
            
        </Container>
    );
    

};

export default ItemListPage;

/*
SearchCond API
------- 공통 부분 -------
type : String
categories : List<Long>
itemName : String

morePrice : Integer
lessPrice : Integer


*/