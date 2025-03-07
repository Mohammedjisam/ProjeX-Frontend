import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyAdminState {
  companyAdminData: any | null;
}

const initialState: CompanyAdminState = {
  companyAdminData: (() => {
    try {
      const storedData = localStorage.getItem("companyAdminData");
      return storedData && storedData !== "undefined" ? JSON.parse(storedData) : null;
    } catch (error) {
      console.warn("Error parsing companyAdminData from localStorage:", error);
      localStorage.removeItem("companyAdminData");
      return null;
    }
  })(),
};

const companyAdminSlice = createSlice({
  name: "companyAdmin",
  initialState,
  reducers: {
    addCompanyAdmin: (state, action: PayloadAction<any>) => {
      state.companyAdminData = action.payload;
      localStorage.setItem("companyAdminData", JSON.stringify(action.payload));
    },
    updateCompanyAdmin: (state, action: PayloadAction<any>) => {
      state.companyAdminData = {
        ...state.companyAdminData,
        ...action.payload
      };
      localStorage.setItem("companyAdminData", JSON.stringify(state.companyAdminData));
    },
    logoutCompanyAdmin: (state) => {
      state.companyAdminData = null;
      localStorage.removeItem("companyAdminData");
      localStorage.removeItem("token");
    },
  },
});

export const { addCompanyAdmin,updateCompanyAdmin, logoutCompanyAdmin } = companyAdminSlice.actions;
export default companyAdminSlice.reducer;