import React, { useRef, useState } from "react";
import "../../../css/category2Depth.css";
import Category3Depth from "./Category3Depth";

const Category2Depth = (props) => {

    const { categoryId, children } = props;

    const depth2Rect = useRef(null);
    const depth3Rect = useRef(null);

    const [ is3DepthOpen, setIs3DepthOpen ] = useState(false);
    const [ is2DepthOpen, setIs2DepthOpen ] = useState(false);

    const category2LayerId = `categoryHoverLayer${categoryId}`;

    // top 값을 렌더링 되기전에 모두 설정해놓을 수 있다.
    // 만약 bottom 값 비교해서 자식이 부모모다 아래 있으면 top값을 조정한다.


    const category2DepthOnMouseEnter = (event) => {

        
        const parentBox = depth2Rect.current.getBoundingClientRect();
        if ((event.target.tagName == "LI")) {
            event.target.classList.add('active');

            const childBox = event.target.querySelector(".category_3depth").getBoundingClientRect();
           
            
            if (childBox.bottom > parentBox.bottom) {
                console.log("자식이 벗어남");
                // 일단 강제로 맞춰두긴 했음
                event.target.querySelector(".category_3depth").style.top =  `${childBox.top - (childBox.bottom - parentBox.bottom) - 162}px`;
            }
        }

    };

    const category2DepthOnMouseLeave = (event) => {

        const items = document.querySelectorAll('.category_2depth_list_item');
        items.forEach(item => {
            item.classList.remove('active');
        })

    };


    return (
        <div id={category2LayerId} className="category_2depth" ref={depth2Rect}>
            
            <ul className="category_2depth_list" >

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
                                    id={item.categoryId}
                                    setIs3DepthOpen={setIs3DepthOpen}
                                    is2DepthOpen={is2DepthOpen}
                                />
                                <a className="category_btn" href={`/products?category=${item.categoryId}`}>{item.categoryName}</a>
                                
                            </li>
                        ))}
                    </>
                }

            </ul>
            
        </div>
    );
};

export default Category2Depth;