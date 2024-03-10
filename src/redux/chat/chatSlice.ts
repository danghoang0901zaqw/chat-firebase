import { createSlice } from '@reduxjs/toolkit';
import { getListRoom } from './chatReducer';
import { ChatState } from '@/types/chat';

const initialState: ChatState = {
    roomId: undefined,
};

const chatSlice = createSlice({
    name: 'chatting',
    initialState,
    reducers: {
        selectedRoomId: () => {},
    },
    extraReducers: (builder) => {
        builder.addCase(getListRoom.pending, (state) => {});
        builder.addCase(getListRoom.fulfilled, (state, action) => {});
        builder.addCase(getListRoom.rejected, (state) => {});
    },
});
export const { selectedRoomId } = chatSlice.actions;

export default chatSlice.reducer;
