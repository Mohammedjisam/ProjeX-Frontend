import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slice/AdminSlice";
import companyAdminReducer from './slice/CompanyAdminSlice'
import managerReducer from './slice/ManagerSlice'
import developerReducer from './slice/DeveloperSlice';
import projectManagerReducer from './slice/ProjectManagerSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    companyAdmin: companyAdminReducer,
    manager: managerReducer,
    developer: developerReducer,
    projectManager: projectManagerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };