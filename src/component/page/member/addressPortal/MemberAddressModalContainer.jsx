import React from "react";
import MemberAddressPortal from "./MemberAddressPortal";

const MemberAddressModalContainer = ({ isOpen, onClose, children }) => {

    if (!isOpen) {
        return null;
    }

    return (
        <MemberAddressPortal>
            <div className="modal-overlay"> {/* onClick={onClose} 오버레이 클릭시 닫기 */}
                <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* 컨텐츠 영역 클릭 시 닫히지 않게 방지 */}

                    <div className="d-flex justify-content-between">
                        <h4 className="modal-title">배송지 관리</h4>

                        <button className="modal-close-button" onClick={onClose}>
                            &times;
                        </button>
                    </div>

                    <hr style={{marginTop: "0"}}/>

                    {children}

                </div>
            </div>

        </MemberAddressPortal>
    );
};

export default MemberAddressModalContainer;