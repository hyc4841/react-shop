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


    // 이부분은 배울점이 있다. 추후라도 이 코드 완벽하게 분석하기
    const filterChgHandler = (field, value) => {

        console.log("필드", field);
        console.log("벨류", value);

        // prev 부분은 콜백 함수 패턴임. 이전 상태를 가져오는 것.
        setSelectedFilters((prev) => {
            // selectedFilters는 객체임.
            const curValues = prev[field] || []; // 선택한 필드가 있으면 해당 값을 가져오고 없으면 빈 객체를 반환.

            if (curValues.includes(value)) {
                // 객체 이기 때문에 중괄호 {} 를 사용해서 묶어주고, 스프레드 문법을 통해 이전 값에 추가하는 구조
                // 해당 필드가 존재하지 않아 새로 추가.
                return {
                    ...prev,
                    [field]: curValues.filter((v) => v !== value), // 값 제거
                };
            } else {
                // 해당 필드가 존재하여 기존 값에 추가.
                return {
                    ...prev,
                    [field]: [...curValues, value], // 값 추가
                };
            }
        });
    };


    // 선택한 필터들 서버에서 받기 좋게 형태 변환하는 함수.
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