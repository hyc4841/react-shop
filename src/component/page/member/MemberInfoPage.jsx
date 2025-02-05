import React from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MemberInfo = (props) => {
    const navigate = useNavigate();

    const StyledSpan = styled.span`
        display: block; 
    `;


    return (
        <Container>
            <p className="text-center" style={{background: "skyblue", marginBottom: "0px"}}>마이 페이지</p>

            <Table hover style={{width: "100%", background: "orange"}} className="text-center">
                <tbody>
                    

                    <tr>
                        <td style={{background: "#d2d2d2"}}>
                            <span>내 쇼핑</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <StyledSpan>주문내역/배송조회</StyledSpan>
                            <StyledSpan>취소/반품/환불/교환 내역</StyledSpan>
                            <StyledSpan>찜한 목록</StyledSpan>
                        </td>
                    </tr>

                    <tr>
                        <th>
                            <span>회원 정보</span>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <StyledSpan>
                                <a href="/mypage/info">회원정보 수정</a>
                            </StyledSpan>

                            <StyledSpan style={{display: "block"}}>회원 탈퇴</StyledSpan>
                        </td>
                    </tr>
                </tbody>

            </Table>
        
        </Container>
    );

}

export default MemberInfo;
