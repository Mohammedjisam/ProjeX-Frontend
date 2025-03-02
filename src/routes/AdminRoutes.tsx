import AdminLogin from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/Dashboard';
import ProtectedAdminLogin from '../private/admin/ProtectedAdminLogin';
import ProtectedAdminRoutes from '../private/admin/ProtectedAdminRoutes';
import { Routes,Route } from 'react-router-dom';


function AdminRoutes() {
  return (
    <div>
      <Routes>
      <Route path='*' element={<ProtectedAdminLogin><AdminLogin/></ProtectedAdminLogin>}/>
      <Route path='dashboard' element={<ProtectedAdminRoutes><AdminDashboard/></ProtectedAdminRoutes>}/>
      </Routes>
    </div>
  )
}

export default AdminRoutes
