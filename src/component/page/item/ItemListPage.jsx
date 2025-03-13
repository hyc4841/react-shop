import axios from "axios";
import React, { useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ItemListPage = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const categoryId = query.get('category');

    const categories = [categoryId];
    const itemName = null;
    const morePrice = null;
    const lessPrice = null;

    const searchCond = {categories, itemName, morePrice, lessPrice};

    console.log(searchCond);

    // 나중에는 검색 태그 같은것들을 바디에 넣어서 조회

    useEffect(() => {
        const fetchItems = async () => {
            try {
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
                                                
            } catch (error) {
                console.log(error);
            }
        };

        fetchItems();
    });


    return (
        <Container className="d-flex">
            <div className="d-flex flex-column flex-shrink" style={{width: "280px"}}>
                <a href="#" className="d-flex align-items-center text-decoration-none">
                    <span>사이드 바</span>

                </a>

                <hr />

                
                
            </div>

        </Container>
    );
    

};

export default ItemListPage;