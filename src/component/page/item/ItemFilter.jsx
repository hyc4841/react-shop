import React from "react";

import '../../../css/itemFilter.css';

const ItemFilter = (props) => {
    const { filterList, filterChgHandler, selectedFilters} = props;
    

    // filterList 이런 애들. 표현해야하는 애들 null일때 오류 발생하니까 이거 예외 처리해주는 부분 만들어야함
    console.log("filterList : ", filterList);

    const fieldNameMap = {
        lapTopBrands: '브랜드',
        lapTopCpus: 'CPU',
        lapTopStorages: '스토리지',
        lapTopScreenSizes: '스크린 크기',
        lapTopManufactureBrands: '제조사'
    };

    return (
        <div className="item_filter">
            <ul>
                {filterList && 
                    Object.entries(filterList).map(([key, values]) => (
                        // 여기서도 접는거 한번 구현하고
                        <dl className="filter_block" key={key}>
                            <dt className="item_dt">{fieldNameMap[key] || key}</dt>
                            <dd className="item_dd">
                                <ul>
                                    {values.map((item, index) => (
                                        // 여기서도 접는거 한번더 구현
                                        // 메인 필터 보여주는 곳
                                        <li className="filter_component" key={index}>
                                            <label key={index}>
                                                <input 
                                                    type="checkbox"
                                                    checked={selectedFilters[key]?.includes(item.specName) || false}
                                                    onChange={() => filterChgHandler(key, item.specName)}/>
                                                {item.specName}
                                            </label>
                                        </li>
                                        // 필터 펼치기 및 접기 버튼

                                        // 모든 필터 보여주는곳
                                        // 컴포넌트 기반으로 만든다.
                                    ))}
                                </ul>
                            </dd>
                        </dl>
                    ))
                }
            </ul>
        </div>
    );

};

export default ItemFilter;
