import React from "react"
import { Modal } from "react-bootstrap"
import DaumPostcode from "react-daum-postcode";


const DaumPostModal = (props) => {

    return (
        <Modal 
            {...props}
            centered >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <DaumPostcode 
                    onComplete={props.onCompleteHandler}
                    onClose={props.onCloseHandler}
                />
            </Modal.Body>
        </Modal>
    );
}





export default DaumPostModal;
                 