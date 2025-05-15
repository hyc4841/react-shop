import { createSlice, createAsyncThunk, buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const loginFetch = createAsyncThunk(
    'user/loginFetch',
    async (credentials, { dispatch, getState, rejectWithValue }) => {
        try {
            console.log(credentials);

            const response = await axios.post('http://localhost:8080/login', credentials, {withCredentials: true});

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutFetch = createAsyncThunk(
    'user/logoutFetch', // 액션 타입 접두사?
    async () => {
        const response = await axios.post('http://localhost:8080/logout', {} , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true 
        });

        console.log(response);
        localStorage.removeItem('accessToken');
    }
);

export const isLoggedInFetch = createAsyncThunk(
    'user/isLoggedInFetch',
    async (args, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8080/member/isLogin', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                withCredentials: true
            });

            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue();
        }
    }
);

export const getMemberData = createAsyncThunk(
    'user/fetchMemberData',
    async (args, { dispatch, getState, rejectWithValue }) => {
        // const navigate = useNavigate(); // slice에선 순수 함수인 것이 좋다. side Effect는 다루지 않는 것이 좋다고 함.
        try {
            const response = await axios.get('http://localhost:8080/member/info', {
                headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
            });
            console.log("멤버 데이터 가져오기 성공 : ", response.data);

            return response.data;

        } catch (error) {
            console.error("멤버 데이터 가져오지 못함 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const addAddressRequest = createAsyncThunk(
    'user/addAddressRequest',
    async (args, { dispatch, getState, rejectWithValue }) => {
        console.log("제대로 나오나? : ", args);

        try {
                const response = await axios.post('http://localhost:8080/member/info/address', args,
                    {
                headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
            });
            console.log("주소 추가 성공 : ", response.data);

            return response.data;

        } catch (error) {
            console.error("주소 추가 요청 실패 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);


const userSlice = createAppSlice({
    name: 'user',

    initialState: { isLoggedIn: false, username: null, loginError: null, memberData: null, memberDataError: null ,addressAddError: null },

    reducers: (create) =>  ({
        login: create.reducer((state, action) => {
            state.isLoggedIn = true;
        }),
        logout: create.reducer((state, action) => {
            state.isLoggedIn = false; 
        }),
    }),

    extraReducers: (builder) => {
        builder
        // memberData
            .addCase(addAddressRequest.pending, (state) => {})
            .addCase(addAddressRequest.fulfilled, (state, action) => {
                console.log(action.payload);
                state.memberData = action.payload
            })  
            .addCase(addAddressRequest.rejected, (state, action) => {
                state.addressAddError = action.payload;
            })

            // memberData
            .addCase(getMemberData.pending, (state) => {})
            .addCase(getMemberData.fulfilled, (state, action) => {
                console.log(action.payload);
                state.memberData = action.payload
            })  
            .addCase(getMemberData.rejected, (state, action) => {
                // action.payload -> message, status
                state.memberDataError = action.payload;
            })
            
            // loginFetch
            .addCase(loginFetch.pending, (state) => {})
            .addCase(loginFetch.fulfilled, (state, action) => {
                console.log(action.payload);

                localStorage.setItem('accessToken', action.payload.token.accessToken);
                state.username = action.payload.userName;
                state.isLoggedIn = true;
            })
            .addCase(loginFetch.rejected, (state, action) => {
                console.log(action);
                console.log(state);
                state.loginError = action.payload.error;
            })

            // logoutFetch
            .addCase(logoutFetch.pending, (state) => {})
            .addCase(logoutFetch.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(logoutFetch.rejected, (state) => {})

            // isLoggedInFetch
            .addCase(isLoggedInFetch.pending, (state) => {})
            .addCase(isLoggedInFetch.fulfilled, (state, action) => {
                console.log("로그인 검증 성공")
                console.log(action);
                console.log(state);
                state.isLoggedIn = true;
                state.username = action.payload.userName;
            })
            .addCase(isLoggedInFetch.rejected, (state, action) => {
                // rejectWithValue가 action의 payload로 담겨서 전달됨.
                console.log("로그인 검증 거부");
                console.log(action);
                console.log(state);

                state.isLoggedIn = false;
                localStorage.removeItem('accessToken');
            })

    }
});

// 액션 생성자와 리듀서
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;