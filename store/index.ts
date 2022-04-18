import {Store} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import testReducer from './test';

const makeSotre = ()=>(
    configureStore({
        reducer: {
            test: testReducer,
        },
    })
)

export type AppStore = ReturnType<typeof makeSotre>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeSotre);