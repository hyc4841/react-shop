import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormSelect } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ItemOptionCard from "./ItemOptionCard";

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

    console.log("최상위 옵션 : ", itemOptions[0]);

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
                    {itemOptions[0]  &&
                        <>
                            <ItemOptionCard 
                                parent={itemOptions[0]}
                                setSelectedItem={setSelectedItem}
                            />
                        </>
                    }
                </Form>
                
            </div>

        </div>


        
    );
};

export default SalesPage;