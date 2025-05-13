import React, { useState } from "react";
import axios from "axios";
import MemberAddressModalContainer from "./MemberAddressModalContainer";
import { Button } from "react-bootstrap";

const MemberAddressModalContent = (props) => {

    const { addressList } = props;
    console.log("주소 리스트 : ", addressList);

    const [ isPopupOpen, setIsPopupOpen ] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleDeleteAddress = async (address) => {
        
        try {
            const response = await axios.delete("http://localhost:8080/member/info/address",
                {
                    data: address.id,
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                console.log("요청 응답 : ", response);
        } catch (error) {
            console.error("주소 삭제 오류 : ", error);
        }
    };
    
    return (
        <div>
            <Button onClick={handleOpenPopup}>배송지 관리</Button>

            <MemberAddressModalContainer isOpen={isPopupOpen} onClose={handleClosePopup}>
                {addressList &&

                    <>
                        {addressList?.map((item, index) => (
                            <div className="d-flex justify-content-between" key={index}>
                                <div>
                                    <p style={{marginBottom: "0"}}>주소 : {item.city} {item.street} {item.detailedAddress}</p>
                                </div>

                                <Button onClick={() => handleDeleteAddress(item)}>삭제</Button>
                            </div>
                        ))}

                        <hr/>

                        {/* 배송 주소 추가 폼 만들어서 추가할 수 있도록 만들기 */}
                        <Button>배송지 추가</Button>
                    </>
                }
            </MemberAddressModalContainer>

        </div>
    );
};

export default MemberAddressModalContent;