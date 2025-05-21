import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDataRequest } from "../../../redux/reducer/userSlice";

const MemberOrderListPage = () => {
    const dispatch = useDispatch();

    const { orderList, orderListError } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(orderDataRequest());

        if (orderListError) {
            console.log("주문 데이터 가져오기 실패 : ", orderListError);
        }

        console.log("주문 내역 데이터 확인 : ", orderList);
    }, []);

    return (
        <div>
            <p>주문 내역 페이지 입니다.</p>
            {orderList && 
                
                orderList.orders?.map((order, index) => (
                    <div style={{border: "2px solid green"}}>
                        <p>주문 id : {order.orderId}</p>
                        <p>주문자 이름 : {order.name}</p> 
                        <p>주문자 상태 : {order.status}</p>
                        <p>주문자 이름 : {order.name}</p>
                        <p>주문 상품 리스트</p>
                        {order.orderItems &&
                            order.orderItems?.map((item, index) => (
                                <div style={{border: "2px solid red"}}>
                                    <p>상품 이름 : {item.itemName}</p>
                                    <p>주문 가격 : {item.orderPrice}</p>
                                    <p>주문 수량 : {item.count}</p>
                                </div>
                            ))}
                    </div>
                ))
            }
        </div>
    );
};

export default MemberOrderListPage;