import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ToastInfo {
    id: number
    message: string | number
    duration?: number
}

type stateType = {
    toasts: ToastInfo[]
}

const initialState: stateType = {
    toasts: []
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        pushToast: (state, action: PayloadAction<{message: string | number, duration?: number}>)=>{
            const {message = '', duration} = action.payload;
            state.toasts.push({
                id: Date.now(),
                message,
                duration,
            });
        },
        removeToast: (state)=>{
            state.toasts.shift();
        },
    }
});

export const uiActions = uiSlice.actions
export default uiSlice.reducer;