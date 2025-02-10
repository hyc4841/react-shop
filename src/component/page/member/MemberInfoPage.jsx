import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MemberInfo = (props) => {
    const navigate = useNavigate();

    const [ memberData, setMemberData ] = useState(null);

    const StyledSpan = styled.span`
        display: block; 
    `;

    useEffect(() => {

        const fetchMemberData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/member/info', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
                });

                console.log(response);

            } catch (error) {
                console.log(error);
                alert("유저를 검증할 수 없습니다.");
                navigate('/'); // 만약 잘못된 토큰 제시로 보안상 문제가 있으면 홈 화면으로 이동
            }
        }

        fetchMemberData();

    }, []);


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
