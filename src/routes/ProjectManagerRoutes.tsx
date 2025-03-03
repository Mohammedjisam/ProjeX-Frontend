import ProjectManagerSignup from '../pages/projectManager/ProjectManagerSignup';
import ProjectManagerLogin from '../pages/projectManager/ProjectManagerLogin';
import { Routes,Route } from 'react-router-dom';
import ProtectedProjectManagerLogin from '../private/projectManager/ProtectedProjectManagerLogin';
import SetPasswordPage from '../components/projectManger/SetPasswordPage';
import ProtectedProjectManagerRoutes from '../private/projectManager/ProtectedProjectManagerRoutes';
import Dashboard from '../components/projectManger/Dashboard';

function ProjectManagerRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<ProtectedProjectManagerLogin><ProjectManagerSignup/></ProtectedProjectManagerLogin>}/>
      <Route path='*' element={<ProtectedProjectManagerLogin><ProjectManagerLogin/></ProtectedProjectManagerLogin>}/>
      <Route path="set-password/:token" element={<SetPasswordPage />} />     
      <Route path='dashboard' element={<ProtectedProjectManagerRoutes><Dashboard/></ProtectedProjectManagerRoutes>}/>
      </Routes>
    </div>
  )
}

export default ProjectManagerRoutes
