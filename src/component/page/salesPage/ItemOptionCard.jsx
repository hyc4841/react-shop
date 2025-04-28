import React, { useState } from "react";
import { Form, FormSelect } from "react-bootstrap";

const ItemOptionCard = (props) => {

    const { parent, setSelectedItems, selectItemHandler } = props;

    const [ nextOption, setNextOption ] = useState('');

    const optionSelectHandler = (e) => {

        if (e.target.value != '') {
            const selectedOption = parent.child.find(item => item.id.toString() === e.target.value) // 선택한 옵션 객체를 가져오기 위한 로직
            // console.log("선택한 옵션 자식의 길이 : ", selectedOption.child.length)
    
            // 선택한 옵션에 자식이 존재하면 다음 계층도 보여줘야 한다.
            if (selectedOption.child.length > 0) {
                console.log("선택 옵션, 상품은 없음 : ", selectedOption);
                setNextOption(selectedOption.child[0]); // 다음 옵션 계층 넘겨주기
            } else if (selectedOption.child.length === 0 && selectedOption.item != null) {
                console.log("선택한 아이템 : ", selectedOption.item);
                // 만약 다음 계층이 없으면, 해당 옵션은 실제 상품을 가지고 있는 옵션임. 따라서 선택 상품을 설정해 준다.
                selectItemHandler(selectedOption.item);
            }
        }
    };

    return (
        <>
            {parent && 
            <>
                <Form.Label>옵션 : {parent.optionName}</Form.Label>
                <FormSelect defaultValue='' onChange={optionSelectHandler}>
                    <option value='' disabled hidden>선택해주세요.</option>
                    {parent.child &&
                        parent.child.map((item, index) => ( 
                            <option key={item.id} value={item.id}>{item.optionName}</option>
                        ))
                    }
                    {/* 선택했던 상품 다시 선택하면 선택이 안되는 문제 발생. */}
                    {/* option에 onSelect라도 해야되나? */}
                    {/* 이건 지금 당장 중요한게 아니니까 차차 생각하고, 지금은 장바구니에 담기 및 바로 주문하기 구현하자 */}
                </FormSelect>

                {/* 다음  */}
                {nextOption && 
                    <ItemOptionCard 
                        parent={nextOption}
                        setSelectedItems={setSelectedItems}
                        selectItemHandler={selectItemHandler}
                    />
                }
            </>
            }
        </>
    );
};

export default ItemOptionCard;