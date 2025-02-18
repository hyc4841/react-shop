import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import DaumPostcode from "react-daum-postcode";


const DaumPostModal = (props) => {

    const { setZipcode, setCity, setStreet, modalOnOff, setModalOnOff } = props;

    const modalOpenCloseHandler = (state) => {
        if (state === 'FORCE_CLOSE') {
            setModalOnOff(false);
        } else if (state === 'COMPLETE_CLOSE') {
            setModalOnOff(false);
        }
    };

    const completeHandler = (data) => {
        const zipcode = data.zonecode;
        setZipcode(zipcode);
        setCity(data.sido)
        console.log(data.sido);

        var addr = '';
        var extraAddr = '';

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
            // setAddress(data.roadAddress);
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
        }
        setStreet(addr + extraAddr);
    };

    // Modal에 onHide 하고 show 있나봄
    return (
        <Modal 
            show={modalOnOff}
            onHide={() => setModalOnOff(false)}
            centered >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <DaumPostcode 
                    onComplete={completeHandler}
                    onClose={modalOpenCloseHandler}
                />
            </Modal.Body>
        </Modal>
    );
}

export default DaumPostModal;             