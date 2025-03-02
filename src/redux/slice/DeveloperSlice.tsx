import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeveloperState {
  developerData: any | null;
}

const initialState: DeveloperState = {
  developerData: (() => {
    try {
      const storedData = localStorage.getItem("developerData");
      return storedData && storedData !== "undefined" ? JSON.parse(storedData) : null;
    } catch (error) {
      console.warn("Error parsing developerData from localStorage:", error);
      localStorage.removeItem("developerData");
      return null;
    }
  })(),
};

const developerSlice = createSlice({
  name: "developer",
  initialState,
  reducers: {
    addDeveloper: (state, action: PayloadAction<any>) => {
      state.developerData = action.payload;
      localStorage.setItem("developerData", JSON.stringify(action.payload));
    },
    logoutDeveloper: (state) => {
      state.developerData = null;
      localStorage.removeItem("developerData");
    },
  },
});

export const { addDeveloper, logoutDeveloper } = developerSlice.actions;
export default developerSlice.reducer;