import { createSlice, createAsyncThunk, buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

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

export const loginFetch = createAsyncThunk(
    'user/loginFetch',
    async (credentials, { dispatch }) => {
        
        console.log(credentials); // credentials은 loginId와 password임.
        
        const response = await axios.post('http://localhost:8080/login', credentials, {withCredentials: true});

        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.token.accessToken);
            console.log(response.data);
        }

        return response.data;
    }
);


const userSlice = createAppSlice({
    name: 'user',

    initialState: { isLoggedIn: false, username: null },

    reducers: (create) =>  ({
        login: create.reducer((state, action) => {
            state.isLoggedIn = true;
        }),
        logout: create.reducer((state, action) => {
            state.isLoggedIn = false; 
        }),

        // 로그인 상태 검사 로직
        isLoggedInFetch: create.asyncThunk(
            async () => {
                console.log("현재 엑세스 토큰 : " + localStorage.getItem('accessToken'));
                const response = await axios.get('http://localhost:8080/member/islogin', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    withCredentials: true
                });
                console.log(response.data);
        
                return await response.data; // payload
                // payload는 action의 반환값?
            },
            {
                pending: (state) => {
                    
                },
                fulfilled: (state, action) => {
                    state.isLoggedIn = true;
                    state.username = action.payload.userName;
                },
                rejected: (state, action) => {
                    console.log("로그인 검증 거부됨");
                    console.log(action.error);
                    console.log(action.meta)
                    state.isLoggedIn = false;
                    localStorage.removeItem('accessToken');
                }
            }
        )
    }),

    extraReducers: (builder) => {
        builder

            // loginFetch
            .addCase(loginFetch.pending, (state) => {

            })
            .addCase(loginFetch.fulfilled, (state, action) => {
                state.username = action.payload.userName;
                state.isLoggedIn = true;
            })
            .addCase(loginFetch.rejected, (state) => {

            })

            // logoutFetch
            .addCase(logoutFetch.pending, (state) => {
                
            })
            .addCase(logoutFetch.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(logoutFetch.rejected, (state) => {

            })
    }
});

// 액션 생성자와 리듀서
export const { login, logout, isLoggedInFetch } = userSlice.actions;
export default userSlice.reducer;