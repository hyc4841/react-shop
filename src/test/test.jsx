import React, { useEffect, useState} from "react";
import axios from "axios";

function TestAPI() {

    const [data, setData] = useState([]); // 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/user"); // 데이터 요청
                setData(response.data); // 응답 데이터 저장
            } catch (error) {
                setError(error);
                console.error("데이터 요청 실패 : " + error); // 에러 알림
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchData(); // 데이터 요청 함수 호출
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    useEffect(() => {
        console.log("데이터 갱신 : " , data);
    }, [data]);

    if (loading) return <p>로딩 중...</p>
    if (error) return <p>에러 발생:{error}</p>
    
    return (
        <div>
            <h1>데이터 목록</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.id}, {item.name}, {item.age}, {item.memo}</li> // 데이터 목록 렌더링
                ))}
            </ul>
        </div>
    );
}

export default TestAPI;