import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    async () => {
        const response = await axios.get('http://localhost:8080/member/islogin', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            withCredentials: true
        });

        console.log(response.data);

        return response.data;
    }
);

const userSlice = createSlice({
    name: 'user',

    initialState: { isLoggedIn: false, username: null },

    reducers: {
        login: (state) => {
            state.isLoggedIn = true; 
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutFetch.pending, (state) => {
                
            })
            .addCase(logoutFetch.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(logoutFetch.rejected, (state) => {

            })

            .addCase(isLoggedInFetch.pending, (state) => {
            
            })
            .addCase(isLoggedInFetch.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.username = action.payload.userName;
            })
            .addCase(isLoggedInFetch.rejected, (state) => {
                
            })
    }
});

// 액션 생성자와 리듀서
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;