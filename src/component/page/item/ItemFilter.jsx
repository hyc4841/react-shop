import React from "react";
import { Row, Col } from "react-bootstrap";


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
        <div>
            <ul>
                {filterList && 
                    Object.entries(filterList).map(([key, values]) => (
                        <div key={key}>
                            <h3>{fieldNameMap[key] || key}</h3>
                            <Row>
                                {values.map((item, index) => (
                                    <Col md={2} key={index}>
                                        <div style={{whiteSpace: "nowrap"}}>
                                            <label key={index} style={{marginRight: "10px"}}>
                                                {item}
                                            </label>
                                            <input 
                                                type="checkbox"
                                                checked={selectedFilters[key]?.includes(item) || false}
                                                onChange={() => filterChgHandler(key, item)}
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))
                }
            </ul>
        </div>
    );

};

export default ItemFilter;
