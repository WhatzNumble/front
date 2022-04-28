import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
import testReducer from './test';
import uiReducer from './ui';
import userReducer from './user';

const makeStore = () =>
  configureStore({
    reducer: {
      test: testReducer,
      ui: uiReducer,
      user: userReducer,
    },
    middleware: [],
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
