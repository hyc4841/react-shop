import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ItemCategorySelectedList from "./ItemCategorySelectedList";
import ItemSpecSelectedList from "./ItemSpecSelectedList";
import { useNavigate } from "react-router-dom";

const ItemSavePage = () => {
    
    const navigate = useNavigate();

    const [ itemSpecList, setItemSpecList ] = useState([]);
    const [ categoryList, setCategoryList ] = useState([]);
    const [ itemDataTypeList, setItemDataTypeList ] = useState([]);

    const [ dataType, setDataType ] = useState('');
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ stockQuantity, setStockQuantity ] = useState('');

    const [ selectedDataTypeSpecList, setSelectedDataTypeSpecList ] = useState(null);
    const [ selectedCategoryList, setSelectedCategoryList ] = useState([]);

    const [ selectedSpecList, setSelectedSpecList ] = useState({});

    let submitData;

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/item');
                console.log("상품 데이터 타입 : ", response.data.itemDataType);
                console.log("상품 스펙 : ", response.data.allItemSpec);
                console.log("응답 데이터 : ", response.data.allCategories);

                setItemDataTypeList(response.data.itemDataType);
                setCategoryList(response.data.allCategories);
                setItemSpecList(response.data.allItemSpec)

            } catch (error) {
                alert("데이터 가져오기 실페");
                console.error(error);
            }
        }

        getData();
    }, []);

    const buildSubmitData = () => {
        // 상품 스펙은 스펙 이름 : 항목 이름 형식으로 가야함.
        const commonField = {
            type: dataType,
            dataType: dataType,
            name: name,
            price: price,
            stockQuantity: stockQuantity,
            categoriesId: selectedCategoryList,
            //  각 데이터 타입에 따른 스펙 영역.
        };

        submitData = {...commonField, ...selectedSpecList};
        console.log("서버로 보낼 데이터 : ", submitData);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        buildSubmitData();

        try {
            const response = await axios.post("http://localhost:8080/item", submitData, );

            console.log("상품 저장 응답 데이터 : ", response);
            alert("상품 저장에 성공했습니다.");
            navigate(0); // 화면 새로 고침.
        } catch (error) {
            console.error(error);
        }

    };

    const dataTypeOnChangeHandler = (dataType) => {
        setDataType(dataType);

        // 선택한 데이터 타입에 따른 상품 스펙 설정
        console.log("스펙 리스트 확인 : ", itemSpecList[dataType][0]);
        setSelectedDataTypeSpecList(itemSpecList[dataType][0]);
    };

    return (
        <Container>
            <h3>상품 저장화면</h3>
            <hr className="mb-5"/>
            <div>
                <Form onSubmit={submitHandler}>
                    <div>
                        <Form.Group controlId="dataType">
                        <Form.Label>상품 데이터 타입</Form.Label>
                        <Form.Select
                            aria-label="데이터 타입 드롭다운"
                            value={dataType}
                            onChange={(e) => dataTypeOnChangeHandler(e.target.value)}>

                            <option value="">상품 타입을 선택해주세요</option>
                            {itemDataTypeList.map((item, index) => (
                                <option key={item} value={item}>{item}</option>
                            ))}

                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="itemName">
                        <Form.Label>상품 이름</Form.Label>
                        <Form.Control type="text"
                            placeholder="상품 이름을 입력해주세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>상품 가격</Form.Label>
                        <Form.Control type="text"
                            placeholder="상품 가격을 입력해주세요"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="stockQuantity">
                        <Form.Label>상품 수량</Form.Label>
                        <Form.Control type="text"
                            placeholder="상품 수량을 입력해주세요"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}/>
                    </Form.Group>
                    
                    <ItemCategorySelectedList 
                        categoryList={categoryList}
                        selectedCategoryList={selectedCategoryList}
                        setSelectedCategoryList={setSelectedCategoryList}
                        depth={0}
                    />

                        {/* 상품 스펙 선택하는 부분 해야함. 하다말았음  */}
                        <ItemSpecSelectedList
                            itemSpecList={selectedDataTypeSpecList}
                            selectedSpecList={selectedSpecList}
                            setSelectedSpecList={setSelectedSpecList}
                        />

                    </div>
                    

                    <div className="text-center">
                        <Button type="submit">아이템 생성</Button>
                    </div>
                    

                </Form>
            </div>


        </Container>

    );
};

export default ItemSavePage;