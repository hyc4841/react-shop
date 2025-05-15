import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DaumPostModal from "../signup/DaumPostModal";
import { addAddressRequest, setAddressAddError } from "../../../redux/reducer/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

const AddressAddModal = ({ isOpen, onCancel }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        dispatch(setAddressAddError());
    }

    const addAddressRequestHandler = async () => {
        const resultAction = await dispatch(addAddressRequest({ zipcode, city, street, detailedAddress, addressName }));

        if (addAddressRequest.fulfilled.match(resultAction)) {
            console.log("성공 : ", resultAction);
            alert("주소 추가에 성공하였습니다!");
            modalCloseHandler();
        }
    };

    const daumModalHandler = (e) => {
        e.preventDefault(); // 폼 제출 방지
        setDaumModalOnOff(true);
    };

    const modalCloseHandler = () => {
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
                        <h4>주소 추가하기</h4>
                        <Button onClick={modalCloseHandler}>취소</Button>
                    </div>
                    
                    <Form>
                        {addressAddError &&
                            addressAddError.zipcode?.map((item, index) => (
                                <p style={{color: "red", marginBottom: "10px"}}>{item.message}</p>
                            ))
                        }
                        <div className="d-flex justify-content-between">
                            <Form.Group controlId="zipcode" style={{width: "48%"}}>
                                <Form.Label className="d-flex">우편번호</Form.Label>
                                <Form.Control type="text" value={zipcode} readOnly required />
                            </Form.Group>

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
                                
                                    addressAddError.detailedAddress?.map((item, index) => (
                                        <div>
                                            <p key={index} style={{color: "red"}}>{item.message}</p>
                                        </div>
                                    ))

                                
                               
                                
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