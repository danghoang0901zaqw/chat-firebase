import { createSlice } from "@reduxjs/toolkit";

export interface ChatState {
  roomId: number | undefined
}

const initialState: ChatState = {
  roomId: undefined
}

const chatSlice = createSlice({
  name: 'chatting',
  initialState,
  reducers: {
    selectedRoomId: () => {

    }
  }
})
export const { selectedRoomId } = chatSlice.actions

export default chatSlice.reducer