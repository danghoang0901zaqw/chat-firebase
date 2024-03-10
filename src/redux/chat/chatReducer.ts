import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListRoom=createAsyncThunk('chat/list-room',
  async (_, thunkAPI) => {
    return 1
  }
)