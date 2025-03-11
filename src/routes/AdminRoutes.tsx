import AdminLogin from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/Dashboard';
import ProtectedAdminLogin from '../private/admin/ProtectedAdminLogin';
import ProtectedAdminRoutes from '../private/admin/ProtectedAdminRoutes';
import { Routes,Route } from 'react-router-dom';
import CompanyAdminManagement from '../components/admin/CompanyAdminManagementComponent';
import ManagerManagement from '../components/admin/ManagerManagement';
import ProjectManagerManagement from '../components/admin/ProjectManagerManagement';
import DeveloperManagement from '../components/admin/DeveloperManagement';


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
      </Routes>
    </div>
  )
}

export default AdminRoutes
