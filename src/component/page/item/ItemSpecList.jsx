import React, { useState } from "react";
import { Button } from "react-bootstrap";

import '../../../css/itemSpecList.css';


const ItemSpecList = (props) => {

    const { specList, field, filterChgHandler, selectedFilters } = props;

    const specListId = `${field}_list`; // 스펙 리스트에 사용할 id. 식별용임
    console.log("specListId : ", specListId);

    console.log("스펙 리스트 : ", specList);

    return (
        <>
            <div id={specListId} className="item_spec_list">

                <hr style={{marginTop: "5px"}}/>
 
                {specList && 
                    <ul>
                        {specList.map((item, index) => (
                            <li className="filter_component normal" key={index}>
                                <label key={index}>
                                    <input 
                                        type="checkbox"
                                        checked={selectedFilters[field]?.includes(item.specName) || false}
                                        onChange={() => filterChgHandler(field, item.specName)}/>
                                    {item.specName}
                                </label>
                            </li>                        

                        ))}
                    </ul>
                }
            </div>
        
        </>
        
    );

};

export default ItemSpecList;