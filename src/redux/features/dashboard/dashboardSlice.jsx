import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  systemConfig: null,
  editValue: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSystemConfig: (state, action) => {
      return (state = { ...state, systemConfig: action.payload });
    },
    setEditValue: (state, action) => {
      return (state = {...state, editValue: action.payload });
    },
  },
});

export const { setSystemConfig, setEditValue } = dashboardSlice.actions;

export default dashboardSlice.reducer;
