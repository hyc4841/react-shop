import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
    
    const navigate = useNavigate();

    const goToHomeButton = () => {
        navigate('/');
    };

    return (
        <div>
            <p>결제 성공!</p>
            <Button onClick={goToHomeButton}>홈 화면으로</Button>
        </div>
    );
}

export default OrderSuccessPage;