import React from "react";
import AddressPortal from "./AddressPortal";
import { Button, Container } from "react-bootstrap";
import "../../../css/addressModalContainer.css";

const AddressModalContainer = ({ isOpen, onClose, children }) => {

    if (!isOpen) {
        return null;
    }
    
    return ( 
        <AddressPortal>
            <div className="modal-overlay"> {/* onClick={onClose} 오버레이 클릭시 닫기 */}
                <Container className="modal-content" onClick={(e) => e.stopPropagation()}> {/* 컨텐츠 영역 클릭 시 닫히지 않게 방지 */}

                    <div className="d-flex justify-content-between">
                        <h4 className="modal-title">주소 선택</h4>

                        <button className="modal-close-button" onClick={onClose}>
                            &times;
                        </button>
                    </div>

                    <hr style={{marginTop: "0"}}/>
                    
                    {/* 모달에 표현되는 자식 */}
                    {children}

                </Container>
            </div>
        </AddressPortal>
    );

};

export default AddressModalContainer;