import { Route,Routes } from 'react-router-dom';
import CompanyAdminSignup from '../pages/companyAdmin/Signup';
import CompanyAdminLogin from '../pages/companyAdmin/Login';
import Dashboard from '../components/companyAdmin/Dashboard';
import ProtectedCompanyAdminLogin from '../private/companyAdmin/ProtectedCompanyAdminLogin';
import ProtectedCompanyAdminRoutes from '../private/companyAdmin/ProtectedCompanyAdminRoute';
import ManagersTable from '../components/companyAdmin/ManagersTable';
import AddManagerPage from '../components/companyAdmin/AddManagerPage';


function CompanyAdminRoutes() {
  return (
    <div>
      <Routes>
      <Route path="signup" element={<ProtectedCompanyAdminLogin><CompanyAdminSignup /></ProtectedCompanyAdminLogin>} />
      <Route path="*" element={<ProtectedCompanyAdminLogin><CompanyAdminLogin /></ProtectedCompanyAdminLogin>} />
      <Route path='dashboard' element={<ProtectedCompanyAdminRoutes><Dashboard/></ProtectedCompanyAdminRoutes>}/>
      <Route path='managers' element={<ProtectedCompanyAdminRoutes><ManagersTable/></ProtectedCompanyAdminRoutes>}/>
      <Route path='addmanager' element={<ProtectedCompanyAdminRoutes><AddManagerPage/></ProtectedCompanyAdminRoutes>}/>
      </Routes>
    </div>
  )
}

export default CompanyAdminRoutes
