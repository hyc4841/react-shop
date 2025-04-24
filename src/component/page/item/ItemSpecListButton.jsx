import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ItemSpecListButton = (props) => {

    const { field } = props;
    
    const [ onOffFlag, setOnOffFlag ] = useState(false);

    const buttonTitle = onOffFlag ? '접기' : '펼치기';

    // 버튼 헨들러
    const itemSpecListHandler = () => {
        const element = document.getElementById(`${field}_list`);
        console.log("field element : ", element);

        if (element != null && element.classList.contains('activate')) { // 버튼 눌렀을 때, activate 되어 있으면
            console.log("접기");
            element.classList.remove('activate'); // activate 제거
            element.style.display = 'none';
            console.log(element.style.dispaly);

            setOnOffFlag(false);
        } else { // 버튼 눌렀을 때, activate 없으면
            console.log("펼치기");
            element.classList.add('activate'); // activate 추가
            element.style.display = 'block';
            console.log(element.style.color);

            setOnOffFlag(true);
        }
    };

    return (

       <Button onClick={itemSpecListHandler} style={{whiteSpace: "nowrap"}}>
            {buttonTitle}
       </Button>
    );
};

export default ItemSpecListButton;