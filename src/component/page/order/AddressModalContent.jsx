import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddressModalContainer from "./AddressModalContainer";
import DaumPostModal from "../signup/DaumPostModal";


const AddressModalContent = (props) => {

    const { selectedAddress, addressList, setSelectedAddress,
        setZipcode, setCity, setStreet, setDetailedAddress,
        zipcode, city, street, detailedAddress, setAddressNullException } = props;

    const [ inputZipcode, setInputZipcode ] = useState('');
    const [ inputCity, setInputCity ] = useState('');
    const [ inputStreet, setInputStreet ] = useState('');
    const [ inputDetailedAddress, setInputDetailedAddress ] = useState('');

    const [ newAddressFieldError, setNewAddressFieldError ] = useState(null);

    const [ isPopupOpen, setIsPopupOpen ] = useState(false);

    const [ daumModalOnOff, setDaumModalOnOff] = useState(false);

    // newAddressInputOnOff. true : 직접 입력하기 버튼 활성화, false : 주소 입력창 활성화
    const [ newAddressInputOnOff, setNewAddressInputOnOff ] = useState(true);

    const inputAddressCleanUp = () => {
        setInputZipcode('');
        setInputCity('');
        setInputStreet('');
        setInputDetailedAddress('');
    };
    const addressCleanUp = () => {
        setZipcode(null);
        setCity(null);
        setStreet(null);
        setDetailedAddress(null);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setNewAddressInputOnOff(true);
        inputAddressCleanUp();
        setNewAddressFieldError(null);
    };

    // 주소 선택 버튼
    const buttonClickHandler = (e, item) => {
        setSelectedAddress(item);
        // 주소를 선택하면 직접 입력 부분은 null로 초기화 해주기
        addressCleanUp();
        inputAddressCleanUp();
        setNewAddressFieldError(null);
        setAddressNullException(null);
        handleClosePopup();
    };

    // 주소 직접 입력 폼 OnOnff.
    const newAddressInputOnOffHandler = () => {
        if (newAddressInputOnOff == true) {
            // 버튼 비활성화/직접 입력 활성화
            setNewAddressInputOnOff(false);
        } else if (newAddressInputOnOff == false) {
            // 버튼 활성화/직접 입력 비활성화
            setNewAddressInputOnOff(true);
            // 입력했던거 전부 삭제하기
            inputAddressCleanUp();
            setNewAddressFieldError(null);
        }
    };

    // 다음 주소 모달 열기. 우편번호 찾기 버튼
    const daumModalHandler = (e) => {
        e.preventDefault();
        setDaumModalOnOff(true);
    };

    // 주소 직접 입력. 확인 버튼
    const addressConfirmHandler = (e) => {
        e.preventDefault();

        // 주소 필드중 하나라도 입력을 안하면 오류 필드를 등록한다.
        if (inputCity != '' && inputZipcode != '' && inputStreet != '' && inputDetailedAddress != '') {

            setNewAddressInputOnOff(true);
            setSelectedAddress(null); // 주소 직접 입력 모드는 선택한 주소를 제거한다.

            setCity(inputCity);
            setZipcode(inputZipcode);
            setStreet(inputStreet);
            setDetailedAddress(inputDetailedAddress);

            setNewAddressFieldError('');
            setAddressNullException(null);
            handleClosePopup();
        } else {
            setNewAddressFieldError("상세 주소까지 모두 입력해주세요");
        }

    };

    return (
        <div>
            {selectedAddress && 
                <div>
                    <p>배송지 이름 : {selectedAddress.addressName}</p>
                    <p>주소 : {selectedAddress.city} {selectedAddress.street} {selectedAddress.detailedAddress}</p>
                </div>
            }

            {city &&
                <>
                    <p>배송지 직접 입력</p>
                    <p>주소 : {city} {street} {detailedAddress}</p>
                </>
            }

            <Button onClick={handleOpenPopup}>주소 선택</Button>

            <AddressModalContainer isOpen={isPopupOpen} onClose={handleClosePopup}>

                {addressList &&
                    addressList?.map((item, index) => (
                        <div className="d-flex justify-content-between" key={index}>
                            <div className="d-flex align-items-center" >
                                <p style={{marginBottom: "0"}}>배송지 : {item.city} {item.street} {item.detailedAddress}</p>
                            </div>
                            <Button onClick={(e) => buttonClickHandler(e, item)}>선택</Button> 
                        </div>
                    ))
                }

                {/* 한 세트임 */}

                    {!newAddressInputOnOff && 
                        <div className="new-address-input">
                            <hr/>

                            <div className="d-flex justify-content-between">
                                <h5>주소 직접</h5>
                                <Button onClick={() => newAddressInputOnOffHandler()}>취소</Button>
                            </div>

                            {newAddressFieldError && 
                                <p style={{color: "red"}}>{newAddressFieldError}</p>
                            }

                            <div className="input-area">
                                <form>
                                    <label htmlFor="zipcode" >우편번호</label>
                                    <input className="form-control" id="zipcode" value={inputZipcode} readOnly required/>
                                    <label htmlFor="street" >주소</label>
                                    <input className="form-control" id="street" value={inputStreet} readOnly required/>
                                    <label htmlFor="detailedAddress" >상세주소</label>
                                    <input className="form-control" id="detailedAddress" value={inputDetailedAddress} onChange={(e) => setInputDetailedAddress(e.target.value)} required/>

                                    <div className="d-flex justify-content-between">
                                        <Button style={{marginTop: "15px"}} onClick={(e) => daumModalHandler(e)}>우편번호 찾기</Button>

                                        <Button style={{marginTop: "15px"}} onClick={(e) => addressConfirmHandler(e)}>확인</Button>
                                    </div>
                                </form>
                                
                            </div>

                            <DaumPostModal 
                                modalOnOff={daumModalOnOff}
                                setModalOnOff={setDaumModalOnOff}
                                setZipcode={setInputZipcode}
                                setCity={setInputCity}
                                setStreet={setInputStreet}
                            />

                        </div>
                    }
                    
                    {newAddressInputOnOff &&
                        <Button style={{marginTop: "20px"}} onClick={() => newAddressInputOnOffHandler()}>직접 입력하기</Button>
                    }

            </AddressModalContainer>
        </div>
        
        
    );
}

export default AddressModalContent;