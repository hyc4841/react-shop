import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../../../css/itemCard.css"

const ItemCard = (props) => {

    const {items} = props;

    console.log("아이템 데이터");
    console.log(items);





    return (
        <div className="item_list">
            {items.map((item, index) => (
                <Card key={index} className="item_card">
                    <Row className="g-0">
                        <Col md={4}>
                            <svg className="item_img bd-placeholder-img" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image"
                            preserveAspectRatio="xMidYMid slice" focusable="false"> 
                                <title>PlaceHolder</title>
                                <rect style={{width: "100%", height: "100%"}} fill="#868e96"></rect>
                                <text x={"50%"} y={"50%"} fill="#dee2e6" dy={".3em"}>Image</text> 

                            </svg>
                        </Col>
                        <Col md={8}>
                            <Card.Body>
                                {/* 이름 규칙 : 제조사 + 브랜드 + 제품명 */}
                                <Card.Title>{item.lapTopManufactureBrand && item.lapTopManufactureBrand} {item.lapTopBrand} {item.name}</Card.Title>
                                <Card.Text>테스트입니다</Card.Text>

                            </Card.Body>
                        </Col>
                    </Row>

                </Card>
            ))}
            
        </div>
        
        


    );
};

export default ItemCard;