import { createSlice } from "@reduxjs/toolkit";

export const Main = createSlice({
  name: "Main",
  initialState: {
    MainClick: null,
    CompanyCliCk: [],
  },
  reducers: {
    setMainClick: (state, action) => {
      state.MainClick = action.payload;
    },
    setCompanyCliCk: (state, action) => {
      state.CompanyCliCk = action.payload;
    },
  },
});

export const { setMainClick, setCompanyCliCk } = Main.actions;
export default Main.reducer;
