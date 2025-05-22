import React, { useState } from "react";
import axios from "axios";
import MemberAddressModalContainer from "./MemberAddressModalContainer";
import { Button } from "react-bootstrap";
import AddressDeleteConfirmModal from "../AddressDeleteConfirmModal";
import AddressAddModal from "../AddressAddModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddressRequest } from "../../../../redux/reducer/userSlice";

const MemberAddressModalContent = (props) => {

    const dispatch = useDispatch();

    const { addressList } = props;

    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
    const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);

    const { deleteAddressError } = useSelector((state) => state.user);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleConfirmYes = async (address) => { 
        console.log("주소 : ", address.addressId);
        var addressId = { addressId: address.addressId };

        const resultAction = await dispatch(deleteAddressRequest(addressId));

        if (deleteAddressRequest.fulfilled.match(resultAction)) {
            alert("주소 삭제에 성공했습니다.");
            setIsDeleteModalOpen(false);
        }

        if (deleteAddressError) {
            setIsDeleteModalOpen(false);
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
                            <div className="d-flex justify-content-between mb-3" key={index}>
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


                {/* 배송지 추가 */}
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