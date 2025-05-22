import { createSlice, createAsyncThunk, buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const loginFetch = createAsyncThunk(
    'user/loginFetch',
    async (credentials, { dispatch, getState, rejectWithValue }) => {
        try {
            console.log(credentials);

            const response = await axios.post('http://localhost:8080/login', credentials, 
                {withCredentials: true});

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
        console.log("주소 추가 요청 데이터 : ", args);

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

export const deleteAddressRequest = createAsyncThunk(
    'user/deleteAddressRequest',
    async (args, { dispatch, getState, rejectWithValue }) => {
        console.log("주소 삭제 id : ", args);
        
        try {
            const response = await axios.delete("http://localhost:8080/member/info/address",
                {
                    data: args,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-type': 'application/json'
                    },
                    withCredentials: true
                });
            
            return response.data;
        } catch (error) {
            console.error("주소 삭제 요청 실패 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const orderDataRequest = createAsyncThunk(
    'user/orderDataRequest',
    async (args, { dispatch, getState, rejectWithValue }) => {
        console.log("멤버 주문 데이터 요청");

        try {
            const response = await axios.get('http://localhost:8080/orders', 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    withCredentials: true
                });

            console.log("주문 내역 요청 응답 : ", response.data);
            return response.data;

        } catch (error) {
            console.error("주문 내역 요청 실패 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginIdUpdate = createAsyncThunk(
    'user/loginIdUpdate',
    async (args, { dispatch, getState, rejectWithValue }) => {
        console.log("로그인 id 변경 : ", args);

        try {
            const response = await axios.put('http://localhost:8080/member/id', 
                args, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            console.log("응답 : ", response.data);
            return response.data;
        } catch (error) {
            console.error("요청 실패 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);

// 이 코드는 이메일 변경 코드 보내는 부분임
export const emailUpdate = createAsyncThunk(
    'user/emailUpdate',
    async (args, { dispatch, getState, rejectWithValue }) => {
        console.log("이메일 변경 : ", args);
        try {
            const response = await axios.post('http://localhost:8080/member/email',
                args,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                }
            );


            console.log("응답 : ", response.data);
            return response.data;

        } catch (error) {
            console.error("요청 실패 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const nameUpdate = createAsyncThunk(
    'user/nameUpdate',
    async (args, { dispatch, getState, rejectWithValue }) => {
        console.log("이름 변경 : ", args);

        try {
            const response = await axios.put('http://localhost:8080/member/name',
                args,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            console.log("응답 : ", response.data);
            return response.data;

        } catch (error) {
            console.error("요청 실패 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const phoneNumCUpdate = createAsyncThunk(
    'user/phoneNumCUpdate',
    async (args, { dispatch, getState, rejectWithValue }) => {
        console.log("휴대폰 번호 변경 : ", args);

        try {
            const response = await axios.put('http://localhost:8080/member/phone-num', 
                args,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                }
            );

            console.log("응답 : ", response.data);
            return response.data;

        } catch (error) {
            console.error("요청 실패 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const passwordUpdate = createAsyncThunk(
    'user/passwordUpdate',
    async (args, { dispatch, getState, rejectWithValue }) => {
        console.log("비밀번호 변경 : ", args);

        try {
            const response = await axios.put('http://localhost:8080/member/password', 
                args,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            console.log("응답 : ", response.data);
            return response.data;

        } catch (error) {
            console.error("요청 실패 : ", error);
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createAppSlice({
    name: 'user',

    initialState: { isLoggedIn: false, username: null, loginError: null,
        memberData: null, memberDataError: null, addressAddError: null,
        deleteAddressError: null, orderList: null, orderListError: null,
        passwordChgError: null, emailChgError: null, phoneNumChgError: null,
        nameChgError: null, passwordChgError: null
     },

    reducers: (create) =>  ({
        login: create.reducer((state, action) => {
            state.isLoggedIn = true;
        }),
        logout: create.reducer((state, action) => {
            state.isLoggedIn = false; 
        }),
        setAddressAddError: create.reducer((state, action) => {
            console.log("주소 추가 예외 삭제");
            state.addressAddError = null;
        }),
        setLoginIdChgError: create.reducer((state, action) => {
            console.log("로그인 id 변경 오류 제거");
            state.passwordChgError = null;
        })
        
    }),

    extraReducers: (builder) => {
        builder
            // loginIdUpdate
            .addCase(loginIdUpdate.pending, (state) => {})
            .addCase(loginIdUpdate.fulfilled, (state, action) => {
                state.memberData = action.payload;
            })
            .addCase(loginIdUpdate.rejected, (state, action) => {
                state.loginChgError = action.payload;
            })

            // orderDataRequest
            .addCase(orderDataRequest.pending, (state) => {})
            .addCase(orderDataRequest.fulfilled, (state, action) => {
                state.orderList = action.payload;
            })
            .addCase(orderDataRequest.rejected, (state, action) => {
                state.orderListError = action.payload;
            })

            // deleteAddressRequest
            .addCase(deleteAddressRequest.pending, (state) => {})
            .addCase(deleteAddressRequest.fulfilled, (state, action) => {
                console.log(action.payload);
                state.memberData = action.payload;
            })
            .addCase(deleteAddressRequest.rejected, (state, action) => {
                state.deleteAddressError = action.payload;
            })

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
export const { login, logout, setAddressAddError, setLoginIdChgError } = userSlice.actions;
export default userSlice.reducer;