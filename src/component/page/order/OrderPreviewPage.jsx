import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OrderPreviewPage = () => {

    const location = useLocation();
    const orderData = location.state; // 이전 페이지에서 보내온 데이터 받기

    console.log("이전 페이지에서 받아온 데이터 : ", orderData);

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get('http://localhost:8080/checkout/order',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        withCredentials: true
                    });
    
                console.log("응답 데이터 : ", response.data);

            } catch (error) {
                console.error(error)
            }
        };

        fetchData();
    }, []);

    return (
        <>
        
        </>
    );
};

export default OrderPreviewPage;