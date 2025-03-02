import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  adminData: any | null;
}

const initialState: AdminState = {
  adminData: (() => {
    try {
      const storedData = localStorage.getItem("adminData");
      return storedData && storedData !== "undefined" ? JSON.parse(storedData) : null;
    } catch (error) {
      console.warn("Error parsing adminData from localStorage:", error);
      localStorage.removeItem("adminData");
      return null;
    }
  })(),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin: (state, action: PayloadAction<any>) => {
      state.adminData = action.payload;
      localStorage.setItem("adminData", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.adminData = null;
      localStorage.removeItem("adminData");
    },
  },
});

export const { addAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
