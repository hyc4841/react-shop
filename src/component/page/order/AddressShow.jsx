import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddressModal from "./AddressModal";

const AddressShow = (props) => {
    const [ selectedAddress, addressList ] = props;

    const [ isPopupOpen, setIsPopupOpen ] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>
            {selectedAddress && 
                <div>
                    <p>배송지 이름 : {selectedAddress.addressName}</p>
                    <p>배송지 이름 : {selectedAddress.city} {selectedAddress.street} {selectedAddress.detailedAddress}</p>
                </div>
            }

            <Button onClick={handleOpenPopup}>주소 변경</Button>

            <AddressModal isOpen={isPopupOpen} onClose={handleClosePopup}>
                {addressList &&
                    addressList?.map((item, index) => (
                        <div>
                            <p>배송지 : {item.city} {item.street} {item.detailedAddress}</p>
                        </div>

                        <Button>선택</Button> 
                        // 선택 버튼 만들어서 selectedAddressd  업데이트 시켜주는 로직 만들자
                        
                    ))
                }

                <Button onClick={handleClosePopup}>닫기</Button>

            </AddressModal>
        </div>
        
        
    );
}

export default AddressShow;