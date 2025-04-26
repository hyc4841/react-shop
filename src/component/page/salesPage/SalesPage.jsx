import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormSelect, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ItemOptionCard from "./ItemOptionCard";

const SalesPage = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageId = query.get('pageId');

    const [ pageData, setPageData ] = useState('');
    const [ itemOptions, setItemOptions ] = useState('');
    const [ selectedItems, setSelectedItems ] = useState([]);

    const [ option1, setOption1 ] = useState('');
    const [ option2, setOption2 ] = useState('')
    const [ option3, setOption3 ] = useState('');

    console.log("최상위 옵션 : ", itemOptions[0]);
    console.log('선택한 아이템들 : ', selectedItems);

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

    };

    const selectHandler = (e, parent) => {

        const selectedOption = parent.child.find(item => item.id.toString() === e.target.value) // 선택한 옵션 객체를 가져오기 위한 로직
        console.log("선택한 옵션 : ", selectedOption);

        // 선택한 옵션 및에 하위 옵션이 있는지 확인해야한다.
        if (selectedOption.child != null) {
        }
    };

    const removeSelectedItem = (e, itemId) => {
        console.log("삭제하려는 아이템 id : ", itemId);
        const removeItem = selectedItems.find(item => item.itemId === itemId); // 이 로직에 문제가 있음

        console.log("삭제하려는 아이템: ", removeItem);
        setSelectedItems((prev) => prev.filter(item => item.itemId !== itemId));

    };

    const selectItemHandler = (selectItem) => {

        console.log("기존에 선택된 상품들 : ", selectedItems);
        const isItem = selectedItems.find(item => item.itemId === selectItem.itemId); // 이 로직에 문제가 있음.
        console.log("기존 리스트에 존재해? : ", isItem);
        


        if (isItem != null) { // 선택한 상품이 이미 선택한 상품 리스트에 있다면,
            alert("이미 선택한 상품 입니다.");
        } else {
            console.log("상품 추가하기 : ", selectItem);
            setSelectedItems(prev => [...prev, selectItem]); 
        }
    };

    
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

                        <div>
                            {selectedItems && 

                                selectedItems.map((item, index) => (
                                    <div key={index}>
                                        <p>{item.itemId}</p>
                                        <p>{item.name}</p>
                                        <p>{item.price}</p>
                                        <p>{item.stockQuantity}</p>
                                        <Button onClick={(e) => removeSelectedItem(e, item.itemId)}>삭제</Button>
                                    </div>

                                ))
                            
                            }
                            

                        </div>

                    </div>
                    
                    
                </Form>
                
            </div>

        </div>


        
    );
};

export default SalesPage;