import PortOne from "@portone/browser-sdk/v2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { data, useLocation, useNavigate } from "react-router-dom";

const storeId = process.env.REACT_APP_PORTONE_STORE_ID;
const channelKey = process.env.REACT_APP_PORTONE_CHANNEL_KEY;

const OrderPreviewPage = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const orderData = location.state?.prevPageData; // 이전 페이지에서 보내온 데이터 받기
    // orderData { pageId : , orderItems : [] }의 형태

    const now = new Date();
    const yearMonthDate = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`;

    const [ fetchedData, setFetchedData ] = useState('');
    const [ paymentStatus, setPaymentStatus ] = useState({status: "IDLE", }); // status : "IDLE", "FAILED", "PENDING", "PAID"

    var itemAndQuantity;

    var paymentId;

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

    // 결제 요청
    // 만약 장바구니 결제를 하면, 판매 페이지를 기준으로 따로 계산 한다.
    const requestPayment = async () => {

        try {
            const response = await PortOne.requestPayment({
                storeId: storeId, // Store ID 설정
                channelKey: channelKey, // 채널 키 설정
                paymentId: `payment-${yearMonthDate}-${crypto.randomUUID()}`, // 결제 Id
                orderName: "테스트", // 주문 이름
                totalAmount: 100, // 결제 비용
                currency: "CURRENCY_KRW", // 통화 설정
                payMethod: "CARD",  // 결제 방식
            });

            console.log("브라우저에서 결제 요청 응답 : ", response);

            // 결제 오류 처리. ex) 결제창 종료 등...
            if (response.code !== undefined) {
                setPaymentStatus({
                    status: "FAILED",
                    message: response.message,
                });
                alert(`결제 실패 : ${response.message}`);
                console.log(response);

                return;
            }
            paymentId = response.paymentId;

            // 결제 성공하고 데이터베이스에 결제 정보 보내고 서버에서 처리하는거하고 브라우저에서 보내는 데이터하고 연결하는 로직 작성해야함.,
            // 서버 측으로 결제 완료 요청 보내기. 스프링 서버에서 처리하는 로직 조금더 고민해봐야함.
            const completeResponse = await axios.post("http://localhost:8080/order/payment/complete", 
                { paymentId },
                {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log("서버측 결제 응답 : ", completeResponse);

            // completeResponse는 서버에서 돌아온 응답임. 여기부턴 내 서버에 맞는 응답 스펙 정해서 처리 해야함.
            if (completeResponse.status == 200) {
                setPaymentStatus({
                    status: completeResponse.status,
                });
            } else {
                console.log("FAILED쪽임 ?여기?");
                setPaymentStatus({
                    status: "FAILED",
                    message: await completeResponse.statusText,
                });
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setPaymentStatus({
            status: "IDLE",
        })
    };

    return (
        <>
            {fetchedData &&
                <>
                    <h4>주문상품 확인</h4>
                    <hr/>
                    {fetchedData.itemList?.map((item, index) => (
                        <div key={index}>
                            
                            <p>상품 이름 : {item.item.name}</p>
                            <p>주문 개수 : {item.quantity}</p>
                        </div>
                    ))}
                    <hr/>
                    <Button onClick={requestPayment}>결제하기</Button>
                </>
            }
        </>
    );
};

export default OrderPreviewPage;