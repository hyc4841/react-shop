import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const StyledButton = styled.button `
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

function WriteButton(props) {
    const { title, onClick } = props;

    return (
        <Button variant="success" onClick={onClick} style={{ marginBottom: '16px'}}>
            {title || "button"}
        </Button>
    );
}

export default WriteButton;