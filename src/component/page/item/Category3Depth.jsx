import React, { useEffect } from "react";
import "../../../css/category3Depth.css";


const Category3Depth = (props) => {

    const { children, depth3Rect, depth2Rect}  = props;

    console.log("3차 네비게이션 children : ", children);

    useEffect(() => {

        const parentRect = depth2Rect.current.getBoundingClientRect();
        const childRect = depth3Rect.current.getBoundingClientRect();

        const calTop = () => {
            console.log("depth3Rect.bottom : ", depth3Rect.bottom);
            console.log("depth2Rect.bottom : ", depth2Rect.bottom);


            if (depth3Rect.bottom > depth2Rect.bottom) {
                depth3Rect.current.style.top = `${parentRect.height} - ${childRect.height}px`; 
            } else {
                depth3Rect.current.style.top = '0px';
            }
        }
        
        calTop();

    }, );


    return (
        <div className="category_3depth" ref={depth3Rect}>
            <ul className="category_3depth_list">
                {children && 
                    <>
                        {children.map((item, index) => (
                            <li className="category_3depth_list_item" key={item.categoryId}>
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