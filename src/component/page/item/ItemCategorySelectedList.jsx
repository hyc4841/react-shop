import React, { useState } from "react";

const ItemCategorySelectedList = (props) => {

    const { categoryList, selectedCategoryList, setSelectedCategoryList, depth } = props;
    // depth는 현재 setSelectedCategoryList의 인덱스와도 같음

    console.log("선택된 카테고리 리스트 : ", selectedCategoryList);

    const [ selectedCategory, setSelectedCategory ] = useState(null);

    const tempList = [];

    // 선택한 카테고리 리스트 재설정 함수
    const refreshSelectedCategoryList = (curList, curIndex, curSelectCategory) => {
        console.log("curIndex : ", curIndex);
        console.log("curList : ", curList);
        if (curIndex == 0) {
            tempList.push(curSelectCategory.categoryId);
            setSelectedCategoryList(tempList);

        } else {
            // 현재 선택한 깊이까지만 복사해서 넣겠다는 부분
            for (let i = 0; i < curIndex; i++) {
                console.log("들어있던 요소? : ", curList[i]);
                tempList.push(curList[i]);
            }
            tempList.push(curSelectCategory.categoryId);
            console.log("저장하려는 tempList : ", tempList);
            setSelectedCategoryList(tempList);
        }
        
    };

    const selectCategory = (category) => {
        console.log(category);
        if (selectedCategory != null) {
            setSelectedCategory(null);
            // 현재 depth 이후의 리스트 요소들은 모두 지워져야함.
        } else {
            setSelectedCategory(category);
            setSelectedCategoryList([...selectedCategoryList, category.categoryId]);
        }
        refreshSelectedCategoryList(selectedCategoryList, depth, category)

    };

    return (
        <div className="d-flex">
            <div className="categoryList">
                {categoryList.map((item, index) => (
                    <p key={index} onClick={(e) => selectCategory(item)}>{item.categoryName}</p>
                ))}
            </div>

            {selectedCategory && 
                <ItemCategorySelectedList
                    categoryList={selectedCategory.children}
                    selectedCategoryList={selectedCategoryList}
                    setSelectedCategoryList={setSelectedCategoryList}
                    depth={depth + 1}
                />
            }

        </div>
        
    );
}

export default ItemCategorySelectedList;