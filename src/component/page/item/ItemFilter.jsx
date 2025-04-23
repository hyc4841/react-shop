import React from "react";
import { Button, Nav } from "react-bootstrap";

import '../../../css/itemFilter.css';

const ItemFilter = (props) => {
    const { filterList, filterChgHandler, selectedFilters} = props;

    // filterList 이런 애들. 표현해야하는 애들 null일때 오류 발생하니까 이거 예외 처리해주는 부분 만들어야함
    console.log("filterList : ", filterList);
    const popularSpec = new Map();

    const displayFilter = () => {
        Object.entries(filterList).forEach(([key1, values]) => {

            if (!popularSpec.has(key1)) {
                popularSpec.set(key1, []);
                console.log("저장되는 필드 이름 : ", key1);
                console.log("이거 맞냐?", popularSpec.get(key1).length);
            }


            values.forEach((value, key) => {
                if (value.isPopularSpec) {
                    popularSpec.get(key1).push(value);
                }
            })
        });
        console.log("인기 상품 스펙 : ", popularSpec);
    };

    displayFilter();

    const fieldNameMap = {
        lapTopBrands: '브랜드',
        lapTopCpus: 'CPU',
        lapTopStorages: '스토리지',
        lapTopScreenSizes: '스크린 크기',
        lapTopManufactureBrands: '제조사',

        tvBrandList: "브랜드",
        tvDisplayPanelList: "화면 패널",
        tvDisplayTypeList: "화면 타입",
        tvHDRList: "HDR",
        tvManufacturerList: "제조사",
        tvPictureQualityList: "화질",
        tvProcessorList: "프로세서",
        tvRefreshRateList: "주사율",
        tvResolutionList: "해상도",
        tvScreenSizeList: "화면 크기",
        tvSoundList: "사운드",
        tvSpeakerChannelList: "스피커 채널",
        tvSpeakerOutputList: "스피커 출력"
    };

    return (
        <div className="item_filter">
            <ul>
                {filterList && 
                    Object.entries(filterList).map(([key, values]) => (
                        // 여기서도 접는거 한번 구현하고
                        <dl className="filter_block" key={key}>
                            <dt className="item_dt">{fieldNameMap[key] || key}</dt>
                            {/* key = tvBrand 이런거임 */}
                            <dd className="item_dd">
                                <ul className="d-flex">
                                    <div>
                                        {values.length > 5 ? 
                                            popularSpec.get(key).map((item, index) => (
                                                <li className="filter_component popular_spec" key={index}>
                                                    <label key={index}>
                                                        <input 
                                                            type="checkbox"
                                                            checked={selectedFilters[key]?.includes(item.specName) || false}
                                                            onChange={() => filterChgHandler(key, item.specName)}/>
                                                        {item.specName}
                                                    </label>
                                                </li>
                                            ))
                                        :
                                            values.map((item, index) => (
                                            // 이 부분은 스펙 수가 5 미만이어서 
                                                <li className="filter_component normal" key={index}>
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
                                            ))
                                        }
                                    </div>

                                    {values.length > 5 && 
                                        <Button>펼치기</Button>
                                    }
                                    
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
