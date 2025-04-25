import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormSelect } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const SalesPage = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageId = query.get('pageId');

    const [ pageData, setPageData ] = useState('');
    const [ itemOptions, setItemOptions ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');

    const [ option1, setOption1 ] = useState('');
    const [ option2, setOption2 ] = useState('')
    const [ option3, setOption3 ] = useState('');


    console.log("페이지 id : ", pageId);
    console.log("옵션 : ", itemOptions[0]);

    useEffect(() => {
            const fetchPage = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/salesPage/${pageId}`);
    
                    console.log("판매 페이지 응답 : ", response.data);
                    console.log("판매 페이지 응답 : ", response.data.page.itemOptionList);

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

    const selectHandler = (e) => {

        // 이거 먼저 계층 구조 어떻게 할건지 부터 정해야함. 지금 뒤죽박죽임. 서버에서 데이터 뿌려줄때도 어떻게 뿌려줄건지 확실히 정하고 가야함.
        // 정안된다면 데이터 구조 전부다 바꿔야함.

        



        console.log("선택된 id : ", e.target.value);
        const selectedOption = itemOptions[0].child.find(item => item.id.toString() === e.target.value);

        console.log("선택된 옵션 : ", selectedOption);
        console.log("selectedOption.child : ", selectedOption.child);


        
        if (selectedOption.child != null && selectedOption.child.length === 0) {
            setSelectedItem(selectedOption.item);
        } else {
            setOption1(selectedOption);
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
                    {itemOptions  &&
                        <>
                            <Form.Group>
                                <Form.Label>옵션 : {itemOptions[0].optionName}</Form.Label>
                                <FormSelect value={selectedItem} onChange={selectHandler}>
                                    <option value="">선택하세요</option>

                                    {itemOptions[0].child && 
                                        itemOptions[0].child.map((item, index) => (
                                            <option key={item.id} value={item.id}>{item.optionName}</option>
                                        ))
                                    }

                                    


                                </FormSelect>
                                

                                {option1 && 
                                    <>

                                        <hr style={{height: "0px"}}/>
                                        <Form.Label>옵션 : {option1.child[0].optionName}</Form.Label>
                                        <FormSelect value={selectedItem} onChange={selectHandler}>
                                            <option value="">선택하세요</option>

                                            {option1.child[0].child && 
                                                option1.child[0].child.map((item, index) => (
                                                    <option key={item.id} value={item.id}>{item.optionName}</option>
                                                ))
                                            }

                                        </FormSelect>
                                    </>
                                        
                                    }


                            </Form.Group>
                            
                        </>
                    }


                </Form>
                
            </div>

        </div>


        
    );
};

export default SalesPage;