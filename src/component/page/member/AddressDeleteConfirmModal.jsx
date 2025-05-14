import React from "react";

const AddressDeleteConfirmModal = ({ isOpen, message, onConfirm, onCancel, address }) => {

    console.log("여기도?");

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={() => onConfirm(address)}>예</button>
                    <button onClick={onCancel}>아니오</button>
                </div>
            </div>
        </div>
    );
};

export default AddressDeleteConfirmModal;