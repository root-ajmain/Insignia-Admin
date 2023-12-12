import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faq: null,
  meta: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setFaq: (state, action) => {
      const { data, meta } = action.payload;

      return (state = { ...state, faq: data, meta: meta });
    },
  },
});

export const { setFaq } = faqSlice.actions;

export default faqSlice.reducer;
