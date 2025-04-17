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

    var temp;
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
            
            <ul className="category_2depth_list">

                {children && 
                    <>
                        {children.map((item, index) => (
                            <div key={item.categoryId}>
                                <p style={{marginBottom: "5px", color: "black"}}><strong>{item.categoryName}</strong></p>
                                {item.children && item.children.length > 0 && (
                                    <>
                                        {item.children.map((child, childIndex) => (
                                            
                                            <li className="category_2depth_list_item" key={child.categoryId}
                                                onMouseEnter={category2DepthOnMouseEnter}
                                                onMouseLeave={category2DepthOnMouseLeave}>

                                                <Category3Depth 
                                                    children={child.children}
                                                    depth3Rect={depth3Rect}
                                                    id={child.categoryId}
                                                    setIs3DepthOpen={setIs3DepthOpen}
                                                    is2DepthOpen={is2DepthOpen}
                                                />
                                                <a className="category_btn" href={`/products?category=${child.categoryId}`}>{child.categoryId} {child.categoryName}</a>
                                            </li>
                                        ))}
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                }

            </ul>
            
        </div>
    );
};

export default Category2Depth;