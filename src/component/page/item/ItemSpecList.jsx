import React from "react";

const ItemSpecList = (props) => {

    const { specList, isActivate } = props;

    const specListOnOff = () => {



    };


    return (

        <div className="off">
            {specList && 
                specList.map((item, index) => (
                    <li className="filter_component normal" key={index}>
                        <label key={index}>
                            <input 
                                type="checkbox"
                                checked={selectedFilters[key]?.includes(item.specName) || false}
                                onChange={() => filterChgHandler(key, item.specName)}/>
                            {item.specName}
                        </label>
                    </li>
                ))
            }
        </div>
    );
};

export default ItemSpecList;