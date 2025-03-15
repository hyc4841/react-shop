import React from "react";
import "../../../css/category2Depth.css";

const Category2Depth = (props) => {

    const { categoryId, children } = props;

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
            
            <ul className="category_2depth_list">

                {children && 
                    <>
                        {children.map((item, index) => (
                            <li className="category_2depth_list_item" key={item.categoryId}
                                onMouseEnter={category2DepthOnMouseEnter}
                                onMouseLeave={category2DepthOnMouseLeave}>
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