import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddressChangeButton = (props) => {

    const { newCity, newStreet, newZipcode, newDetailedAddress, fetchMemberData, onChangeError } = props;

    const navigate = useNavigate();

    const submitAddressUpdate = async () => {
      
        try {
            const response = await axios.post('http://localhost:8080/member/address', 
            { newCity, newStreet, newZipcode, newDetailedAddress },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            console.log(response.data);
            alert("주소가 성공적으로 변경되었습니다");
            fetchMemberData(response.data.memberInfo);
            navigate(0); // 페이지 새로고침
            
        } catch (error) {
            console.log(error.response);
            onChangeError(error.response.data);
        }
    };
    


    return (
        <Button type="button" onClick={submitAddressUpdate}>변경하기</Button>

    );

};

export default AddressChangeButton;