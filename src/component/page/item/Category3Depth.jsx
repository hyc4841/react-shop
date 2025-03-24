import React, { useEffect, useRef } from "react";
import "../../../css/category3Depth.css";


const Category3Depth = (props) => {

    const { children, depth3Rect, id }  = props;

    return (
        <div id={`category_3depth_${id}`} className="category_3depth" ref={depth3Rect}>
            <ul className="category_3depth_list">
                {children && 
                    <>
                        {children.map((item, index) => (
                            <li className="category_3depth_list_item" key={item.categoryId} style={{padding: "5px"}}>
                                <a href={`/products?category=${item.categoryId}`}>{item.categoryName}</a>
                            </li>
                        ))}
                    </>
                }

            </ul>

        </div>
    );
}

export default Category3Depth;