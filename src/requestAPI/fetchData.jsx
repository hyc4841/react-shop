import axios from "axios";

const fetchData = (url) => {
    var data;
    var loading;
    var error;

    // 이렇게 axios객체 먼저 만들어서 보낼 수도 있음
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080', // 기본 url 설정
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }

    });

    const getUserData = async () => {
        try {
            const res = await axiosInstance.get('/member/islogin');
            data = res.data;
            console.log("응답 데이터: " + res.data);
        } catch (err) {
            console.log("오류 발생 : " + err);
            error = err;
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            data = res.data;
            console.log("res:" + res.data);
        } catch (err) {
            error = err;
            console.log("데이터 요청 실패 : " + err);
        } finally {
            loading = false;
        }
    };

    // getData();
    getUserData();

    return { data, loading, error };
};

export default fetchData;
