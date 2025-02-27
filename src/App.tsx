// client/src/App.tsx

import { Routes, Route } from 'react-router-dom';
import CompanyAdminSignup from './pages/companyAdmin/Signup';
import MangerSignup from './pages/manager/ManagerSignup'
import ProjectManagerSignup from './pages/projectManager/ProjectManagerSignup';
import DeveloperSignup from './pages/developer/DeveloperSignup';
import CompanyAdminLogin from './pages/companyAdmin/Login';
import DeveloperLogin from './pages/developer/DeveloperLogin'
import ManagerLogin from './pages/manager/mangerLogin';
import ProjectManagerLogin from './pages/projectManager/ProjectManagerLogin';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <Routes>
      <Route path="/companyadmin/signup" element={<CompanyAdminSignup />} />
      <Route path="/companyadmin/login" element={<CompanyAdminLogin />} />
      <Route path='/manager/signup' element={<MangerSignup/>}/>
      <Route path="/manager/login" element={<ManagerLogin/>}/>
      <Route path='/projectmanager/signup' element={<ProjectManagerSignup/>}/>
      <Route path='/projectmanager/login' element={<ProjectManagerLogin/>}/>
      <Route path='/developer/signup' element={<DeveloperSignup/>}/>
      <Route path='/developer/login' element={<DeveloperLogin/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
    </Routes>
  );
}

export default App;