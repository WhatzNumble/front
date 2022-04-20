import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';

type stateType = {
    count: number
    toastMessages: (string | number)[]
}

const initialState: stateType = {
    count: 0,
    toastMessages: []
}

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>)=>{
            state.count = action.payload;
        },
        pushToast: (state, action: PayloadAction<string | number>)=>{
            state.toastMessages.push(action.payload);
        },
        removeToast: (state)=>{
            state.toastMessages.shift();
        },
    }
});

export const testActions = testSlice.actions
export default testSlice.reducer;

// thunk
export const longTask = ()=>{
    return async (dispath: Dispatch)=> {
        await new Promise<string>((resolve) => {
            setTimeout(()=>{
                resolve('끝!');
            }, 3000);
        });
    }
}