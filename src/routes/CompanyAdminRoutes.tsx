import { Route,Routes } from 'react-router-dom';
import CompanyAdminSignup from '../pages/companyAdmin/Signup';
import CompanyAdminLogin from '../pages/companyAdmin/Login';
import Dashboard from '../components/companyAdmin/Dashboard';
import ProtectedCompanyAdminLogin from '../private/companyAdmin/ProtectedCompanyAdminLogin';
import ProtectedCompanyAdminRoutes from '../private/companyAdmin/ProtectedCompanyAdminRoute';
import ManagersTable from '../components/companyAdmin/ManagersTable';
import AddManagerPage from '../components/companyAdmin/AddManagerPage';
import FirstPage from '../pages/companyAdmin/FirstPage';
import Profile from '../components/companyAdmin/Profile';
import PaymentPage from '../pages/companyAdmin/Stripe';


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
      <Route path='payment' element={<ProtectedCompanyAdminRoutes><PaymentPage/></ProtectedCompanyAdminRoutes>}/>
      <Route path='profile' element={<ProtectedCompanyAdminRoutes><Profile/></ProtectedCompanyAdminRoutes>}/>
      </Routes>
    </div>
  )
}

export default CompanyAdminRoutes
