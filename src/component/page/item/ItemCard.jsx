import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../../../css/itemCard.css"

const ItemCard = (props) => {

    const { items } = props;

    console.log("아이템 데이터 : ", items);



    function formattinPrice(price) {
        const formettedPrice = new Intl.NumberFormat('ko-KR', {
            style: 'currency', // 만약 단위 표시 없애고 싶으면 decimal로 설정하면 됨.
            currency: 'KRW',
        }).format(price);

        return formettedPrice
    };


    console.log("아이템 리스트의 길이 : ", items.length);
    return (
        <div className="item_list">
            {items.length != 0 ? 
                <>
                    {items.map((item, index) => (
                        <Card key={index} className="item_card mb-3">
                            <Row className="g-0">
                                <Col md={4} style={{width: "250px", height: "250px"}}>
                                    <svg className="item_img bd-placeholder-img" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image"
                                    preserveAspectRatio="xMidYMid slice" focusable="false" style={{width: "250px", height: "250px"}}> 
                                        <title>PlaceHolder</title>
                                        <rect style={{width: "100%", height: "100%"}} fill="#868e96"></rect>
                                        <text x={"50%"} y={"50%"} fill="#dee2e6">Image</text> 
                                    </svg>
                                </Col>
                                <Col md={8} className="position-relative">
                                    <Card.Body className="p-0" style={{width: "0", height: "0"}}>
                                            {/* 이름 규칙 : 제조사 + 브랜드 + 제품명 */}
                                            <Row className="position-absolute w-100 h-100 p-3 g-0">
                                                {/* 판매 페이지 이름 및 설명 */}
                                                <Col md={9} className="" >
                                                    <a className="" href={`/salesPage/?pageId=${item.id}`} style={{textDecorationLine: "none", color: "black"}}>
                                                        <Card.Title>{item.pageName}</Card.Title>
                                                    </a>
                                                    <Card.Text className="">{item.description}</Card.Text>
                                                </Col>
                                                {/* 가격 */}
                                                <Col md={3} className="d-flex align-items-center">
                                                    {item.isMainItem ? 
                                                        <Card.Text className="d-flex justify-content-end" style={{whiteSpace: "nowrap"}}>{formattinPrice(item.mainItem.price)} 원</Card.Text>
                                                    :
                                                        <Card.Text className="d-flex justify-content-end" style={{whiteSpace: "nowrap"}}> 원</Card.Text>
                                                    }
                                                </Col>
                                            </Row>
                                    </Card.Body>  
                                </Col>
                            </Row>
                        </Card>
                    ))} 
                </>
            :
                <p className="text-center"><strong> 검색 결과가 없습니다 </strong></p>
            }
        </div>
    );
};

export default ItemCard;