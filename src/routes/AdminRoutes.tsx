import AdminLogin from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/Dashboard/Dashboard';
import ProtectedAdminLogin from '../private/admin/ProtectedAdminLogin';
import ProtectedAdminRoutes from '../private/admin/ProtectedAdminRoutes';
import { Routes,Route } from 'react-router-dom';
import { DeveloperManagement } from '../pages/admin/DeveloperManagement';
import { CompanyAdminManagement } from '../pages/admin/CompanyAdminManagement';
import { ManagerManagement } from '../pages/admin/ManagerManagement';
import { ProjectManagerManagement } from '../pages/admin/ProjectManagerManagement';
import { CompanyManagement } from '../pages/admin/CompanyManagement';
import ViewCompany from '../pages/admin/ViewCompany';


function AdminRoutes() {
  return (
    <div>
      <Routes>
      <Route path='*' element={<ProtectedAdminLogin><AdminLogin/></ProtectedAdminLogin>}/>
      <Route path='dashboard' element={<ProtectedAdminRoutes><AdminDashboard/></ProtectedAdminRoutes>}/>
      <Route path='dashboard' element={<ProtectedAdminRoutes><AdminDashboard/></ProtectedAdminRoutes>}/>
      <Route path='companyadmin' element={<ProtectedAdminRoutes><CompanyAdminManagement/></ProtectedAdminRoutes>}/>
      <Route path='manager' element={<ProtectedAdminRoutes><ManagerManagement/></ProtectedAdminRoutes>}/>
      <Route path='projectmanager' element={<ProtectedAdminRoutes><ProjectManagerManagement/></ProtectedAdminRoutes>}/>
      <Route path='developer' element={<ProtectedAdminRoutes><DeveloperManagement/></ProtectedAdminRoutes>}/>
      <Route path='company' element={<ProtectedAdminRoutes><CompanyManagement/></ProtectedAdminRoutes>}/>
      <Route path='company/:id' element={<ProtectedAdminRoutes><ViewCompany/></ProtectedAdminRoutes>}/>

      </Routes>
    </div>
  )
}

export default AdminRoutes
