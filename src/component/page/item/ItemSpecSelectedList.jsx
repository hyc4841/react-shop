import React from "react";

const ItemSpecSelectedList = (props) => {
    const { itemSpecList, selectedSpecList, setSelectedSpecList } = props;

    console.log("상품 스펙 선택 부분 확인 : ", itemSpecList)

    const checkboxOnChangeHandler = (field, value) => {
        // 상품 스펙 선택은 중복 선택이 안되도록 만들어야 한다.
        // 객체 안에 해당 필드가 있는지 본다. 없으면 추가
        // 객체 안에 해당 필드가 존재하고 선택한 값이 이전에 선택했던 값이 아니면 아니면 바꾼다.
        // 객체 안에 해당 필드가 존재하고 선택한 값이 이전에 선택했던 값과 같으면 선택 해제를 한다.

        setSelectedSpecList((prev) => {
            const curValues = prev[field] || null; // 해당 필드 찾아오기, 없으면 빈 배열 반환.

            // curValues는 배열값이 아닌 단일 객체값.
            console.log("선택한 스펙 필드 : ", field);
            console.log("curValues값 : ", curValues);
            console.log("스펙 항목 : ", value);

            // 기존에 선택된 값은 어떻게 하지?
            if (curValues == null || curValues != value) {
                console.log("여기로 들어온다.");
                return {
                    ...prev,
                    [field]: value,
                };
            } else {
                return {
                    ...prev,
                    [field]: null,
                }
            }
        });

        console.log("현재 선택된 상품 스팩 : ", selectedSpecList);
    };

    return (
        <div>
            {itemSpecList &&
                <ul>
                    {Object.entries(itemSpecList).map(([key, value]) => (
                        <dl key={key}>
                            <dt>
                                {key}
                            </dt>

                            <dd>
                                <ul>
                                    {value.map((item, index) => (
                                        <li key={index}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={ selectedSpecList[key] == item.specName || false}
                                                    onChange={() => checkboxOnChangeHandler(key, item.specName)} />
                                                {item.specName}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </dl>           
                    ))}
                </ul>
            }
        </div>

        
    );
};

export default ItemSpecSelectedList;