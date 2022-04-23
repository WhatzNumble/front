import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import testReducer from './test';
import uiReducer from './ui';
import userReducer from './user';


const makeSotre = ()=>(
    configureStore({
        reducer: {
            test: testReducer,
            ui: uiReducer,
            user: userReducer
        },
    })
)

export type AppStore = ReturnType<typeof makeSotre>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeSotre);