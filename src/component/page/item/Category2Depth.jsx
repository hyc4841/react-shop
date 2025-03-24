import React, { useRef } from "react";
import "../../../css/category2Depth.css";
import Category3Depth from "./Category3Depth";

const Category2Depth = (props) => {

    const { categoryId, children } = props;

    const depth2Rect = useRef(null);
    const depth3Rect = useRef(null);

    const category2LayerId = `categoryHoverLayer${categoryId}`;


    const category2DepthOnMouseEnter = (event) => {

        if ((event.target.tagName == "LI")) {
            event.target.classList.add('active');
        }
    };

    const category2DepthOnMouseLeave = (event) => {

        const items = document.querySelectorAll('.category_2depth_list_item');
        items.forEach(item => {
            item.classList.remove('active');
        })

    };


    return (
        <div id={category2LayerId} className="category_2depth" >
            
            <ul className="category_2depth_list" ref={depth2Rect}>

                {children && 
                    <>
                        {children.map((item, index) => (
                            <li className="category_2depth_list_item" key={item.categoryId}
                                onMouseEnter={category2DepthOnMouseEnter}
                                onMouseLeave={category2DepthOnMouseLeave}>

                                    {/* 여기에 3차 네비게이션 넣어야함. */}
                                <Category3Depth 
                                    children={item.children}
                                    depth3Rect={depth3Rect}
                                    depth2Rect={depth2Rect}
                                />
                                <a href={`/products?category=${item.categoryId}`}>{item.categoryName}</a>
                            </li>
                        ))}
                    </>
                }

            </ul>
            
        </div>
    );
};

export default Category2Depth;