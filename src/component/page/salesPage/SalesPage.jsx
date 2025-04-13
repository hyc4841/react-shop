import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SalesPage = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageId = query.get('pageId');

    const [ pageData, setPageData ] = useState('');

    console.log("페이지 id : ", pageId);

    useEffect(() => {
            const fetchPage = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/salesPage/${pageId}`);
    
                    console.log("판매 페이지 응답 : ", response.data);
                    /*
                    data.page
                    data.review
                    */
                    setPageData(response.data);

                } catch (error) {
                    console.error("페이지 응답을 가져오지 못함 : ", error);
                }
            }
    
            fetchPage();
        }, []);
    
    return (
        <div>
            {pageData.page && 
                <>
                    <p>{pageData.page.id}</p>
                    <p>{pageData.page.pageName}</p>
                    <p>{pageData.page.description}</p>
                </>

                
            }
            

        </div>
    );
};

export default SalesPage;