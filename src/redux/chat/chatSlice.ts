import { ChatState } from '@/types/chat';
import { createSlice } from '@reduxjs/toolkit';
import { getListRoom } from './chatReducer';

const initialState: ChatState = {
    roomId: undefined,
};

const chatSlice = createSlice({
    name: 'chatting',
    initialState,
    reducers: {
        selectedRoomId: (state, action) => {
            state.roomId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListRoom.pending, (state) => { });
        builder.addCase(getListRoom.fulfilled, (state, action) => { });
        builder.addCase(getListRoom.rejected, (state) => { });
    },
});
export const { selectedRoomId } = chatSlice.actions;

export default chatSlice.reducer;
