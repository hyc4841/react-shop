import React, { useEffect, useRef } from "react";
import "../../../css/category3Depth.css";


const Category3Depth = (props) => {

    const { children, depth3Rect, id }  = props;

    var temp;
    
    // 버블 정렬 사용. 2중 for문은 무조건 n^2 임. 카테고리 수가 그렇게 많지 않으니까 일단 사용.
    for (var i = 0; i < children.length; i++) {
        for (var j = i + 1; j < children.length; j++) {
            if (children[i].sequence > children[j].sequence) {
                // 스위칭한다.
                temp = children[i];
                children[i] = children[j];
                children[j] = temp;
            }
        }
    }

    return (
        <div id={`category_3depth_${id}`} className="category_3depth" ref={depth3Rect}>
            <ul className="category_3depth_list">
                {children && 
                    <>
                        {children.map((item, index) => (
                            <li className="category_3depth_list_item" key={item.categoryId} style={{padding: "5px"}}>
                                <a href={`/products?category=${item.categoryId}`}>{item.categoryId} {item.categoryName}</a>
                            </li>
                        ))}
                    </>
                }

            </ul>

        </div>
    );
}

export default Category3Depth;