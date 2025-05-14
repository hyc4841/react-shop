import React, { useState } from "react";
import axios from "axios";
import MemberAddressModalContainer from "./MemberAddressModalContainer";
import { Button } from "react-bootstrap";
import AddressDeleteConfirmModal from "../AddressDeleteConfirmModal";
import AddressAddModal from "../AddressAddModal";

const MemberAddressModalContent = (props) => {

    const { addressList } = props;
    console.log("주소 리스트 : ", addressList);

    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
    const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleConfirmYes = async (address) => {
        console.log("주소 : ", address.addressId);
        var addressId = address.addressId;
        
        try {
            const response = await axios.delete("http://localhost:8080/member/info/address",
                {
                    data: {addressId},
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-type': 'application/json'
                    },
                    withCredentials: true
                });
                console.log("요청 응답 : ", response);
                alert("주소 삭제에 성공했습니다.");
                
                setIsDeleteModalOpen(false);

        } catch (error) {
            alert("주소 삭제에 실패했습니다.");
            
            setIsDeleteModalOpen(false);
            console.error("주소 삭제 오류 발생 : ", error.response.data);
        }
    };

    const handleConfirmNo = () => {
        setIsDeleteModalOpen(false);
    };

    const hadleAddCancle = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpenPopup}>배송지 관리</Button>

            <MemberAddressModalContainer isOpen={isPopupOpen} onClose={handleClosePopup}>
                {addressList.length > 0 ? 
                     <>
                        {addressList?.map((item, index) => (
                            <div className="d-flex justify-content-between" key={index}>
                                <div>
                                    <p style={{marginBottom: "0"}}>주소 : {item.city} {item.street} {item.detailedAddress}</p>
                                </div>

                                <Button onClick={() => setIsDeleteModalOpen(true)}>삭제</Button>

                                <AddressDeleteConfirmModal
                                    address={item}
                                    isOpen={isDeleteModalOpen}
                                    message="삭제 하시겠습니까?"
                                    onConfirm={handleConfirmYes}
                                    onCancel={handleConfirmNo}
                                />
                            </div>
                        ))}

                        <hr/>

                        
                    </>
                :
                    <div>
                        <p>등록된 주소가 없습니다</p>
                    </div>
                }

                
                <Button onClick={() => setIsAddModalOpen(true)}>배송지 추가</Button>

                <AddressAddModal 
                    isOpen={isAddModalOpen}
                    onCancel={hadleAddCancle}
                />

            </MemberAddressModalContainer>

        </div>
    );
};

export default MemberAddressModalContent;