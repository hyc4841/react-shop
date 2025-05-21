import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Table } from "react-bootstrap";

const StyledSpan = styled.span`
        display: block;
    `;

const MypageNav = (props) => {
    const navigate = useNavigate();

    
    return (
        
        <Container style={{ border: '1px solid black', padding: '0px', whiteSpace: "nowrap", width: 'fit-content' }}>
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
                            <StyledSpan>
                                <a className="myPageList" href="/mypage/orders">주문내역/배송조회</a>
                            </StyledSpan>
                            <StyledSpan>
                                <a className="myPageList" href="/mypage/cancel-return-change">취소/반품/환불/교환 내역</a>
                            </StyledSpan>
                            <StyledSpan>
                                <a className="myPageList" href="/mypage/cart">찜한 목록</a>
                            </StyledSpan>
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
                                <a className="myPageList" href="/mypage/info">회원정보 수정</a>
                            </StyledSpan>

                            <StyledSpan>
                                <a className="myPageList" href="/member/delete">회원 탈퇴</a>
                            </StyledSpan>
                        </td>
                    </tr>
                </tbody>

            </Table>
        
        </Container>



    );
}

export default MypageNav;
