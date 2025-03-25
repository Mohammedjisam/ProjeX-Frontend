import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "../../types/Profile";

interface CompanyAdminState {
  companyAdminData: ProfileData | null;
}

const initialState: CompanyAdminState = {
  companyAdminData: (() => {
    try {
      const storedData = localStorage.getItem("companyAdminData");
      return storedData && storedData !== "undefined" 
        ? JSON.parse(storedData) 
        : null;
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
    setCompanyAdmin: (state, action: PayloadAction<ProfileData>) => {
      state.companyAdminData = action.payload;
      localStorage.setItem("companyAdminData", JSON.stringify(action.payload));
    },
    updateCompanyAdmin: (state, action: PayloadAction<Partial<ProfileData>>) => {
      if (state.companyAdminData) {
        state.companyAdminData = {
          ...state.companyAdminData,
          ...action.payload,
        };
        localStorage.setItem("companyAdminData", JSON.stringify(state.companyAdminData));
      }
    },
    logoutCompanyAdmin: (state) => {
      state.companyAdminData = null;
      localStorage.removeItem("companyAdminData");
      localStorage.removeItem("token");
    },
  },
});

export const { setCompanyAdmin, updateCompanyAdmin, logoutCompanyAdmin } = companyAdminSlice.actions;
export default companyAdminSlice.reducer;