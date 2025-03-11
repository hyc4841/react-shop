import React from "react";
import "../../../css/categoryNav.css";

const Category2Depth = (props) => {

    const { categoryId, children } = props;

    const category2LayerId = `categoryHoverLayer${categoryId}`;

    return (
        <div id={category2LayerId} className="category_2depth" >
            
            <ul>

                {children && 
                <>
                    {children.map((item, index) => (
                        <li key={item.categoryId}>
                            <a href="#">{item.categoryName}</a>
                        </li>
                    ))}
                </>
                }

            </ul>
            
        </div>
    );
};

export default Category2Depth;