import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DaumPostModal from "../signup/DaumPostModal";
import { addAddressRequest } from "../../../redux/reducer/userSlice";

const AddressAddModal = ({ isOpen, onCancel }) => {

    const dispatch = useDispatch();

    const [ city, setCity ] = useState('');
    const [ zipcode, setZipcode ] = useState('');
    const [ street, setStreet ] = useState('');
    const [ detailedAddress, setDetailedAddress ] = useState('');
    const [ addressName, setAddressName ] = useState('');

    const { addressAddError }  = useSelector((state) => state.user);

    const [ daumModalOnOff, setDaumModalOnOff ] = useState(false);


    // 주소 초기화 함수
    const addressClean = () => {
        setCity('');
        setZipcode('');
        setStreet('');
        setDetailedAddress('');
    }

    const addAddressRequestHandler = () => {
        dispatch(addAddressRequest({ zipcode, city, street, detailedAddress, addressName }));
    };

    const daumModalHandler = (e) => {
        e.preventDefault(); // 폼 제출 방지
        setDaumModalOnOff(true);
    };

    const modalCancleHandler = () => {
        onCancel();
        addressClean();
    };


    if (!isOpen) {
        return null;
    }

    console.log("에러 확인 : ", addressAddError);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                
                <div className="modal-actions">
                    <div className="d-flex justify-content-between">
                        <p>주소 추가하기</p>
                        <Button onClick={modalCancleHandler}>취소</Button>
                    </div>
                    
                    <Form>
                        <div className="d-flex justify-content-between">

                            <div>
                                <Form.Group controlId="zipcode" style={{width: "48%"}}>
                                    <Form.Label>우편번호</Form.Label>
                                    <Form.Control type="text" value={zipcode} readOnly required />
                                </Form.Group>

                                {addressAddError &&
                                    addressAddError.zipcode
                                }
                            </div>
                            

                            <Form.Group controlId="addressName" style={{width: "48%"}}>
                                <Form.Label>주소 별명</Form.Label>
                                <Form.Control type="text" value={addressName} onChange={(e) => setAddressName(e.target.value)} />
                            </Form.Group>
                        </div>
                        


                        <Form.Group controlId="street">
                            <Form.Label>주소</Form.Label>
                            <Form.Control type="text" value={street} readOnly required />
                        </Form.Group>


                        <div>
                            <Form.Group controlId="detailedAddress">
                                <Form.Label>상세주소</Form.Label>
                                <Form.Control type="text" value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)} required />
                            </Form.Group>

                            {addressAddError &&
                                <div>
                                    {addressAddError.detailedAddress?.map((item, index) => (
                                        <p key={index} style={{color: "red"}}>{item.message}</p>
                                    ))}

                                </div>
                               
                                
                            }

                        </div>
                        

                        <div style={{marginTop: "15px"}} className="d-flex justify-content-between">
                            <Button  onClick={(e) => daumModalHandler(e)}>우편번호 찾기</Button>
                            <Button  onClick={() => addAddressRequestHandler()}>추가하기</Button>
                        </div>

                    </Form>

                    
                    

                    <DaumPostModal 
                            modalOnOff={daumModalOnOff}
                            setModalOnOff={setDaumModalOnOff}
                            setZipcode={setZipcode}
                            setCity={setCity}
                            setStreet={setStreet}
                        />
                </div>
            </div>
        </div>
    );

};

export default AddressAddModal;