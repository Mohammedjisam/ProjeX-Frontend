import { Routes, Route } from 'react-router-dom';
import ManagerSignup from '../pages/manager/ManagerSignup';
import ManagerLogin from '../pages/manager/ManagerLogin';
import ProtectedManagerLogin from '../private/manger/ProtectedManagerLogin'
import ProtectedManagerRoutes from '../private/manger/ProtectedManagerRoutes';
import Dashboard from '../pages/manager/Dashboard';
import { DevelopersPage } from '../pages/manager/DevelopersPage';
import AddDeveloperPage from '../pages/manager/AddDeveloperPage'; 
import ProjectManagersPage from '../pages/manager/ProjectManagersPage';
import AddProjectManagerPage from '../pages/manager/AddProjectManagerPage';
import ProjectsPage from '../pages/manager/ProjectsPage';
import AddProjectPage from '../pages/manager/AddProjectPage';
import EditProjectPage from '../pages/manager/EditProjectPage';
import ProjectViewPage from '../pages/manager/ProjectViewPage';
import Profile from '../pages/manager/Profile';
import SetPasswordPage from '../pages/common/SetPasswordPage';

function ManagerRoutes() {
  return (
    <div>
      <Routes>
        <Route path='signup' element={<ProtectedManagerLogin><ManagerSignup /></ProtectedManagerLogin>} />
        <Route path="*" element={<ProtectedManagerLogin><ManagerLogin /></ProtectedManagerLogin>} />
        <Route path="set-password/:token" element={<SetPasswordPage />} />
        <Route path='dashboard' element={<ProtectedManagerRoutes><Dashboard/></ProtectedManagerRoutes>}/>
        <Route path='projectmanagers' element={<ProtectedManagerRoutes><ProjectManagersPage/></ProtectedManagerRoutes>}/>
        <Route path='addprojectmanager' element={<ProtectedManagerRoutes><AddProjectManagerPage/></ProtectedManagerRoutes>}/>
        <Route path='developers' element={<ProtectedManagerRoutes><DevelopersPage/></ProtectedManagerRoutes>}/>
        <Route path='adddeveloper' element={<ProtectedManagerRoutes><AddDeveloperPage/></ProtectedManagerRoutes>}/>
        <Route path='projects' element={<ProtectedManagerRoutes><ProjectsPage/></ProtectedManagerRoutes>}/>
        <Route path='addproject' element={<ProtectedManagerRoutes><AddProjectPage/></ProtectedManagerRoutes>}/>
        <Route path="projects/:id" element={<ProtectedManagerRoutes><ProjectViewPage/></ProtectedManagerRoutes>}/>
        <Route path="projects/:id/edit" element={<ProtectedManagerRoutes><EditProjectPage/></ProtectedManagerRoutes>}/>
        <Route path="profile" element={<ProtectedManagerRoutes><Profile/></ProtectedManagerRoutes>}/>
        
      </Routes>
    </div>
  );
}

export default ManagerRoutes;
