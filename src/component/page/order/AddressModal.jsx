import React from "react";
import AddressPortal from "./AddressPortal";
import { Button } from "react-bootstrap";

const AddressModal = ({ isOpen, onClose, children }) => {

    if (!isOpen) {
        return null;
    }
};

return (
    <AddressPortal>
        <div className="modal-overlay" onClick={onClose}> {/* 오버레이 클릭시 닫기 */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* 컨텐츠 영역 클릭 시 닫히지 않게 방지 */}
                <Button className="modal-close-button" onClick={onClose}>
                    &times;
                </Button>
                {children}
            </div>
        </div>
    </AddressPortal>
);

export default AddressModal;