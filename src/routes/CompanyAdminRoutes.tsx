// src/routes/CompanyAdminRoutes.tsx
import { Route, Routes } from 'react-router-dom';
import CompanyAdminSignup from '../pages/companyAdmin/Signup';
import CompanyAdminLogin from '../pages/companyAdmin/Login';
import Dashboard from '../pages/companyAdmin/Dashboard';
import ProtectedCompanyAdminLogin from '../private/companyAdmin/ProtectedCompanyAdminLogin';
import ProtectedCompanyAdminRoutes from '../private/companyAdmin/ProtectedCompanyAdminRoute';
import FirstPage from '../pages/companyAdmin/FirstPage';
import PaymentPage from '../pages/companyAdmin/Stripe';
import TenantForm from '../pages/companyAdmin/CompanyRegistrationPage';
import PaymentSuccess from '../pages/companyAdmin/PaymentSuccess'; 
import ViewProject from '../pages/companyAdmin/ViewProject';
import ManagersTable from '../pages/companyAdmin/ManagersTable';
import AddManagerPage from '../pages/companyAdmin/AddManagerPage';
import ProjectTable from '../pages/companyAdmin/ProjectTable';
import Profile from '../pages/companyAdmin/Profile';

function CompanyAdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="signup" element={<ProtectedCompanyAdminLogin><CompanyAdminSignup /></ProtectedCompanyAdminLogin>} />
        <Route path="*" element={<ProtectedCompanyAdminLogin><CompanyAdminLogin /></ProtectedCompanyAdminLogin>} />
        <Route path='dashboard' element={<ProtectedCompanyAdminRoutes><Dashboard/></ProtectedCompanyAdminRoutes>}/>
        <Route path='managers' element={<ProtectedCompanyAdminRoutes><ManagersTable/></ProtectedCompanyAdminRoutes>}/>
        <Route path='addmanager' element={<ProtectedCompanyAdminRoutes><AddManagerPage/></ProtectedCompanyAdminRoutes>}/>
        <Route path='landing' element={<ProtectedCompanyAdminRoutes><FirstPage/></ProtectedCompanyAdminRoutes>}/>
        <Route path='tenant-form' element={<ProtectedCompanyAdminRoutes><TenantForm/></ProtectedCompanyAdminRoutes>}/>
        <Route path='payment' element={<ProtectedCompanyAdminRoutes><PaymentPage/></ProtectedCompanyAdminRoutes>}/>
        <Route path='payment-success' element={<ProtectedCompanyAdminRoutes><PaymentSuccess/></ProtectedCompanyAdminRoutes>}/>
        <Route path='profile' element={<ProtectedCompanyAdminRoutes><Profile/></ProtectedCompanyAdminRoutes>}/>
        <Route path='projects' element={<ProtectedCompanyAdminRoutes><ProjectTable/></ProtectedCompanyAdminRoutes>}/>
        <Route path='projects/:projectId' element={<ProtectedCompanyAdminRoutes><ViewProject/></ProtectedCompanyAdminRoutes>}/>
      </Routes>
    </div>
  )
}

export default CompanyAdminRoutes;