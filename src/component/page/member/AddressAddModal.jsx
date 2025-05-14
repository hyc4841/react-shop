import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import DaumPostModal from "../signup/DaumPostModal";
import { addAddressRequest } from "../../../redux/reducer/userSlice";

const AddressAddModal = ({ isOpen, onCancel }) => {

    const dispatch = useDispatch();

    const [ city, setCity ] = useState('');
    const [ zipcode, setZipcode ] = useState('');
    const [ street, setStreet ] = useState('');
    const [ detailedAddress, setDetailedAddress ] = useState('');
    const [ daumModalOnOff, setDaumModalOnOff ] = useState(false);



    const addAddressRequestHandler = () => {
        try {
            dispatch(addAddressRequest(city, zipcode, street, detailedAddress));

        } catch (error) {

        }
    };

    const daumModalHandler = (e) => {
        e.preventDefault(); // 폼 제출 방지
        setDaumModalOnOff(true);
    };


    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>주소 추가하기</p>
                <div className="modal-actions">
                    <Button onClick={onCancel}>취소</Button>
                    <Form>
                        
                        <Form.Group controlId="zipcode">
                            <Form.Label>우편번호</Form.Label>
                            <Form.Control type="text" value={zipcode} readOnly required />
                        </Form.Group>

                        <Form.Group controlId="street">
                            <Form.Label>주소</Form.Label>
                            <Form.Control type="text" value={street} readOnly required />
                        </Form.Group>

                        <Form.Group controlId="detailedAddress">
                            <Form.Label>상세주소</Form.Label>
                            <Form.Control type="text" value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)} required />
                        </Form.Group>


                        <Button onClick={(e) => daumModalHandler(e)}>우편번호 찾기</Button>

                        <DaumPostModal 
                            modalOnOff={daumModalOnOff}
                            setModalOnOff={setDaumModalOnOff}
                            setZipcode={setZipcode}
                            setCity={setCity}
                            setStreet={setStreet}
                        />

                    </Form>

                    <Button onClick={() => addAddressRequestHandler()}>추가하기</Button>
                </div>
            </div>
        </div>
    );

};

export default AddressAddModal;