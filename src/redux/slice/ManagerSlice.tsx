import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ManagerState {
  managerData: any | null;
}

const initialState: ManagerState = {
  managerData: (() => {
    try {
      const storedData = localStorage.getItem("managerData");
      return storedData && storedData !== "undefined" ? JSON.parse(storedData) : null;
    } catch (error) {
      console.warn("Error parsing managerData from localStorage:", error);
      localStorage.removeItem("managerData");
      return null;
    }
  })(),
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    addManager: (state, action: PayloadAction<any>) => {
      state.managerData = action.payload;
      localStorage.setItem("managerData", JSON.stringify(action.payload));
    },
    updateManager: (state, action: PayloadAction<any>) => {
      state.managerData = {
        ...state.managerData,
        ...action.payload
      };
      localStorage.setItem("managerData", JSON.stringify(state.managerData));
    },
    logoutManager: (state) => {
      state.managerData = null;
      localStorage.removeItem("managerData");
    },
  },
});

export const { addManager, updateManager,logoutManager } = managerSlice.actions;
export default managerSlice.reducer;