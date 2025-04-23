import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { data, useLocation } from "react-router-dom";
import CategoryNav from "./CategoryNav";
import ItemCard from "./ItemCard";
import ItemFilter from "./ItemFilter";

import '../../../css/itemListPage.css';


const ItemListPage = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const categoryId = query.get('category');

    const categories = categoryId;

    const [ morePrice, setMorePrice ] = useState(null);
    const [ lessPrice, setLessPrice ] = useState(null);
    const [ itemName , setItemName ] = useState(null);
    const [ type, setType ] = useState(null);

    const [ items, setItems ] = useState([]);
    const [ itemFilter, setItemFilter ] = useState([]);

    const [ selectedFilters, setSelectedFilters ] = useState({}); // 필터에서 선택된 조건들

    var dataParams;

    const searchCond = {type, categories, itemName, morePrice, lessPrice}; // 공통 검색 조건


    const filterChgHandler = (field, value) => {

        console.log("필드", field);
        console.log("벨류", value);

        setSelectedFilters((prev) => {
            const curValues = prev[field] || [];

            if (curValues.includes(value)) {
                return {
                    ...prev,
                    [field]: curValues.filter((v) => v !== value), // 값 제거
                };
            } else {
                return {
                    ...prev,
                    [field]: [...curValues, value], // 값 추가
                };
            }
        });
    };


    // 서버로 보낼 데이터 형태 잘 잡아서 보내기
    const convertParams = () => {

        const params = new URLSearchParams();

        for (const key in itemFilter) {
            params.append(key, '');
        }        

        for (const key in searchCond) {
            if (searchCond[key] !== undefined) {
                if (searchCond[key] == null) {
                    params.append(key, '');
                } else {
                    params.append(key, searchCond[key]);
                }
            }
        }

        console.log("selectedFilters : ", selectedFilters);
        for (const key in selectedFilters) {
            if (Array.isArray(selectedFilters[key]) && selectedFilters[key].length > 0) {
                params.delete(key);
                var condList = null;
                selectedFilters[key].forEach(value => {
                    // 이부분에 map에다가 string으로 넣기
                    if (condList == null) {
                        condList = value;
                    } else if (condList != null) {
                        condList += "," + value;
                    }
                });
                console.log("condList : ", condList);
                params.append(key, condList);
            }
        }


        console.log("dataParams : ", params);
        dataParams = params;
    };
    

    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log("categoryId : ", categoryId);
                convertParams();
                console.log("params : ", dataParams.toString());

                const response = await axios.get(`http://localhost:8080/items`, {
                    params: dataParams,
                },
                /*
                        type: dataType,
                        categories: categoryId,
                        itemName: itemName,
                        morePrice: morePrice,
                        lessPrice: lessPrice
                        */
                        // ... 구문은 searchCond 객체의 각 속성을 params 객체에 직접 추가해준다. 한마디로 객체 편탄화 된다는 말.
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
                });


                console.log("응답 데이터 : ", response.data);

                setItems(response.data.itemList);
                setType(response.data.type);
                setItemFilter(response.data.itemFilter);
                                     
            } catch (error) {
                console.log(error);
            }
        };

        fetchItems();
    }, [selectedFilters]); // selectedFilters가 갱신될 때마다 데이터를 받아올거임


    return (
        <Container className="d-flex">
            
            {/* 카테고리 네비게이션 */}
            <CategoryNav />
            
            {/* 상품 리스트 */}
            <div>
                {/* 상세검색 필터링 체크하는 곳 */}
                
                <ItemFilter 
                    filterList={itemFilter}
                    filterChgHandler={filterChgHandler}
                    selectedFilters={selectedFilters}
                /> 

                <hr className="separation_line"/>

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