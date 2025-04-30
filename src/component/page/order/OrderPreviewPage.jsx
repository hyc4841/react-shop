import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";

const OrderPreviewPage = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const orderData = location.state?.prevPageData; // 이전 페이지에서 보내온 데이터 받기
    // orderData { pageId : , orderItems : [] }의 형태

    const [ fetchedData, setFetchedData ] = useState('');

    var itemAndQuantity;

    console.log("이전 페이지에서 받아온 데이터 : ", orderData);

    const convertData = () => {

        const dataa = new Map();

        // for ... of 로 순회하기
        /*
        for (const [key, value] of orderData.orderItems) {
            
                key.itemId : 상품 id
                value : 주문 수량
            
            dataa.set(key.itemId, value);
        }
        */

        for (const [key, value] of orderData.orderItems.entries()) {
            // entry는 key-value 데이터
            dataa.set(key.itemId, value);
        }

        itemAndQuantity = Object.fromEntries(dataa.entries());
        console.log("itemAndQuantity : ", itemAndQuantity)
    }

    useEffect(() => {
        const fetchData = async () => {

            console.log(itemAndQuantity);
            
            try {
                const response = await axios.post('http://localhost:8080/checkout/order',
                    { itemAndQuantity },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        withCredentials: true
                    }
                );
    
                console.log("응답 데이터 : ", response.data);
                setFetchedData(response.data);

            } catch (error) {
                // 수량 부족 오류면 이전 페이지로 이동하기
            /*
                if () {
                    alert("주문 상품 수량 부족으로 주문이 불가합니다!. 이전 페이지로 이동합니다.");
                    navigate(-1); // -1은 이전 페이지로 이동
                }
            */
                console.error(error)
            }
        };

        convertData(); // 서버로 보낼 데이터 변환 함수
        fetchData();   // 서버로 데이터 보내기
    }, []);

    return (
        <>
        
        </>
    );
};

export default OrderPreviewPage;