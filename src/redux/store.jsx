import { configureStore, createSlice } from "@reduxjs/toolkit";
import { getDefaultNormalizer } from "@testing-library/react";
import { createLogger } from "redux-logger";
import rootReducer from "./reducer/rootReducer";

const logger = createLogger();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // 기본 미들웨어에 logger 추가
});

export default store;