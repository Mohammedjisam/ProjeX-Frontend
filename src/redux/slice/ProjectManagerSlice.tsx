import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectManagerState {
  projectManagerData: any | null;
}

const initialState: ProjectManagerState = {
  projectManagerData: (() => {
    try {
      const storedData = localStorage.getItem("projectManagerData");
      return storedData && storedData !== "undefined" ? JSON.parse(storedData) : null;
    } catch (error) {
      console.warn("Error parsing projectManagerData from localStorage:", error);
      localStorage.removeItem("projectManagerData");
      return null;
    }
  })(),
};

const projectManagerSlice = createSlice({
  name: "projectManager",
  initialState,
  reducers: {
    addProjectManager: (state, action: PayloadAction<any>) => {
      state.projectManagerData = action.payload;
      localStorage.setItem("projectManagerData", JSON.stringify(action.payload));
    },
    logoutProjectManager: (state) => {
      state.projectManagerData = null;
      localStorage.removeItem("projectManagerData");
    },
  },
});

export const { addProjectManager, logoutProjectManager } = projectManagerSlice.actions;
export default projectManagerSlice.reducer;
