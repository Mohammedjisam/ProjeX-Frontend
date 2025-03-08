import { Routes, Route } from 'react-router-dom';
import ManagerSignup from '../pages/manager/ManagerSignup';
import ManagerLogin from '../pages/manager/ManagerLogin';
import ProtectedManagerLogin from '../private/manger/ProtectedManagerLogin'
import SetPasswordPage from '../components/manager/SetPasswordPage';
import ProtectedManagerRoutes from '../private/manger/ProtectedManagerRoutes';
import { Dashboard } from '../components/manager/Dashboard';
import ProjectManagersTable from '../components/manager/ProjectManagerTable';
import DevelopersTable from '../components/manager/DeveloperTable';
import AddProjectManagerPage from '../components/manager/AddProjectManagerPage';
import AddDeveloperPage from '../components/manager/AddDeveloperPage';
import ProjectsTable from '../components/manager/ProjectTable';
import AddNewProject from '../components/manager/AddProject';
import ViewProject from '../components/manager/ViewProject';
import EditProject from '../components/manager/EditProject';
import Profile from '../components/manager/Profile';

function ManagerRoutes() {
  return (
    <div>
      <Routes>
        <Route path='signup' element={<ProtectedManagerLogin><ManagerSignup /></ProtectedManagerLogin>} />
        <Route path="*" element={<ProtectedManagerLogin><ManagerLogin /></ProtectedManagerLogin>} />
        <Route path="set-password/:token" element={<SetPasswordPage />} />
        <Route path='dashboard' element={<ProtectedManagerRoutes><Dashboard/></ProtectedManagerRoutes>}/>
        <Route path='projectmanagers' element={<ProtectedManagerRoutes><ProjectManagersTable/></ProtectedManagerRoutes>}/>
        <Route path='addprojectmanager' element={<ProtectedManagerRoutes><AddProjectManagerPage/></ProtectedManagerRoutes>}/>
        <Route path='developers' element={<ProtectedManagerRoutes><DevelopersTable/></ProtectedManagerRoutes>}/>
        <Route path='adddeveloper' element={<ProtectedManagerRoutes><AddDeveloperPage/></ProtectedManagerRoutes>}/>
        <Route path='projects' element={<ProtectedManagerRoutes><ProjectsTable/></ProtectedManagerRoutes>}/>
        <Route path='addproject' element={<ProtectedManagerRoutes><AddNewProject/></ProtectedManagerRoutes>}/>
        <Route path="projects/:id" element={<ProtectedManagerRoutes><ViewProject/></ProtectedManagerRoutes>}/>
        <Route path="projects/:id/edit" element={<ProtectedManagerRoutes><EditProject/></ProtectedManagerRoutes>}/>
        <Route path="profile" element={<ProtectedManagerRoutes><Profile/></ProtectedManagerRoutes>}/>
        
      </Routes>
    </div>
  );
}

export default ManagerRoutes;
