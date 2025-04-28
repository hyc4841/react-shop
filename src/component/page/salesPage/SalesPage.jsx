import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormSelect, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ItemOptionCard from "./ItemOptionCard";

const SalesPage = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageId = query.get('pageId');

    const [ pageData, setPageData ] = useState('');
    const [ itemOptions, setItemOptions ] = useState('');
    const [ selectedItems, setSelectedItems ] = useState(new Map()); // selectedItems는 map 객체임

    const [ option1, setOption1 ] = useState('');
    const [ option2, setOption2 ] = useState('');
    const [ option3, setOption3 ] = useState(''); 

    useEffect(() => {
            const fetchPage = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/salesPage/${pageId}`);

                    /*
                    data.page
                    data.review
                    */
                    setPageData(response.data);
                    setItemOptions(response.data.page.itemOptionList);

                } catch (error) {
                    console.error("페이지 응답을 가져오지 못함 : ", error);
                }
            }
    
            fetchPage();
        }, []);


    const formSubmitHandler = (e) => {
        e.preventDefault();

        console.log(selectedItems.size);

        if (selectedItems.size > 0) {
            const orderData = {
                pageId: pageId,
                orderItems: selectedItems, // map 객체. item - quantity
                // 추후에 추가할 데이터
            };
    
            navigate('/order/preview', { state: orderData });
        } else {
            alert("상품을 선택해주세요");
        }
    };

    const selectHandler = (e, parent) => {

        const selectedOption = parent.child.find(item => item.id.toString() === e.target.value) // 선택한 옵션 객체를 가져오기 위한 로직
        console.log("선택한 옵션 : ", selectedOption);

        // 선택한 옵션 및에 하위 옵션이 있는지 확인해야한다.
        if (selectedOption.child != null) {
        }

    };

    // 상품 삭제하기
    const removeSelectedItem = (e, item) => {
        console.log("삭제하려는 상품 : ", item);

        const newSelectedItems  = new Map(selectedItems);
        newSelectedItems.delete(item);

        setSelectedItems(newSelectedItems);
    };

    // 상품 선택하기
    const selectItemHandler = (selectItem) => {

        console.log("기존에 선택된 상품들 : ", selectedItems);
        console.log("선택한 아이템이 기존에 선택한 아이템 리스트에 존재하나요? : ", selectedItems.has(selectItem));

        if (selectedItems.has(selectItem) == true) { // 선택한 상품이 이미 선택한 상품 리스트에 있다면,
            alert("이미 선택한 상품 입니다.");
        } else {
            console.log("상품 추가하기 : ", selectItem);
            const newSelectedItems  = new Map(selectedItems);
            newSelectedItems.set(selectItem, 1);

            setSelectedItems(newSelectedItems);
        }
    };

    // 상품 수량 변경 함수
    const quantityChangeHandler = (e, item) => {


        console.log("새로 입력된 값? : ", e.target.value);

        const newSelectedItems  = new Map(selectedItems);
        newSelectedItems.set(item,  Number(e.target.value));

        setSelectedItems(newSelectedItems);
    }

    
    return (
        <div className="d-flex">
            <div className="item_description">
                {pageData.page && 
                    <>
                        <p>{pageData.page.id}</p>
                        <p>{pageData.page.pageName}</p>
                        <p>{pageData.page.description}</p>
                    </>
                }
            </div>

            <div className="item_option">
                <Form onSubmit={formSubmitHandler}>
                    {/* 이거 그냥 재귀 함수처럼 하면 그냥 되겠는데? */}

                    <div className="d-flex">
                        {/* 상품 옵션 */}
                        <div>
                            {itemOptions[0]  &&
                                <>
                                    <ItemOptionCard 
                                        parent={itemOptions[0]}
                                        setSelectedItems={setSelectedItems}
                                        selectItemHandler={selectItemHandler}
                                    />
                                </>
                            }
                        </div>

                        {/* 선택된 상품들 */}
                        <div>
                            {selectedItems && 
                                [...selectedItems.entries()].map(([key, value], index) => (
                                    <div key={index}>
                                        <p>인덱스는 : {index}</p>
                                        <p>{key.itemId}</p>
                                        <p>상품명 : {key.name}</p>
                                        <p>상품 가격 : {key.price}</p>
                                        <p>보유 수량 : {key.stockQuantity}</p>

                                        <input name="quantity" type="number" value={value} min={1} step={1} required onChange={(e) => quantityChangeHandler(e, key)} style={{display: "block", marginBottom: "10px"}}/>

                                        <Button onClick={(e) => removeSelectedItem(e, key)}>삭제</Button>
                                    </div>
                                ))
                            }

                            <hr/>
                            <Button onClick={formSubmitHandler}>주문하기</Button>
                        </div>
                    </div>
                    


                </Form>
                
            </div>
        </div>


        
    );
};

export default SalesPage;