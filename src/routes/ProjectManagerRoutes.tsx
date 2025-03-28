import ProjectManagerSignup from '../pages/projectManager/ProjectManagerSignup';
import ProjectManagerLogin from '../pages/projectManager/ProjectManagerLogin';
import { Routes,Route } from 'react-router-dom';
import ProtectedProjectManagerLogin from '../private/projectManager/ProtectedProjectManagerLogin';
import SetPasswordPage from '../components/projectManger/SetPasswordPage';
import ProtectedProjectManagerRoutes from '../private/projectManager/ProtectedProjectManagerRoutes';
import ProjectManagerProfile from '../components/projectManger/Profile';
import AddTask from '../pages/projectManager/AddTaskPage';
import DashboardPage from '../pages/projectManager/Dashboard';
import ProjectsPage from '../pages/projectManager/ProjectsPage';
import ProjectDetailsPage from '../pages/projectManager/ProjectDetailsPage';
import TaskDetailsPage from '../pages/projectManager/TaskDetailsPage';
import ProjectTasksPage from '../pages/projectManager/ProjectTasksPage';

function ProjectManagerRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<ProtectedProjectManagerLogin><ProjectManagerSignup/></ProtectedProjectManagerLogin>}/>
      <Route path='*' element={<ProtectedProjectManagerLogin><ProjectManagerLogin/></ProtectedProjectManagerLogin>}/>
      <Route path="set-password/:token" element={<SetPasswordPage />} />     
      <Route path='dashboard' element={<ProtectedProjectManagerRoutes><DashboardPage/></ProtectedProjectManagerRoutes>}/>
      <Route path='profile' element={<ProtectedProjectManagerRoutes><ProjectManagerProfile/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects' element={<ProtectedProjectManagerRoutes><ProjectsPage/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects/:id' element={<ProtectedProjectManagerRoutes><ProjectDetailsPage/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects/:id/addtask' element={<ProtectedProjectManagerRoutes><AddTask/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects/:id/tasks' element={<ProtectedProjectManagerRoutes><ProjectTasksPage/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects/:id/tasks/:taskId' element={<ProtectedProjectManagerRoutes><TaskDetailsPage/></ProtectedProjectManagerRoutes>}/>

      </Routes>
    </div>
  )
}

export default ProjectManagerRoutes
