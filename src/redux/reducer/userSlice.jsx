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


            // isLoggedInFetch
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