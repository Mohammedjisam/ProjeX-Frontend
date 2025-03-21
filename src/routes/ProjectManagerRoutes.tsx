import ProjectManagerSignup from '../pages/projectManager/ProjectManagerSignup';
import ProjectManagerLogin from '../pages/projectManager/ProjectManagerLogin';
import { Routes,Route } from 'react-router-dom';
import ProtectedProjectManagerLogin from '../private/projectManager/ProtectedProjectManagerLogin';
import SetPasswordPage from '../components/projectManger/SetPasswordPage';
import ProtectedProjectManagerRoutes from '../private/projectManager/ProtectedProjectManagerRoutes';
import Dashboard from '../components/projectManger/Dashboard';
import ProjectManagerProfile from '../components/projectManger/Profile';
import Projects from '../components/projectManger/Projects';
import ProjectDetails from '../components/projectManger/ProjectDetails';
import AddTask from '../components/projectManger/AddTask';
import TasksTable from '../components/projectManger/Tasks';
import TaskDetails from '../components/projectManger/TaskDetails';

function ProjectManagerRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<ProtectedProjectManagerLogin><ProjectManagerSignup/></ProtectedProjectManagerLogin>}/>
      <Route path='*' element={<ProtectedProjectManagerLogin><ProjectManagerLogin/></ProtectedProjectManagerLogin>}/>
      <Route path="set-password/:token" element={<SetPasswordPage />} />     
      <Route path='dashboard' element={<ProtectedProjectManagerRoutes><Dashboard/></ProtectedProjectManagerRoutes>}/>
      <Route path='profile' element={<ProtectedProjectManagerRoutes><ProjectManagerProfile/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects' element={<ProtectedProjectManagerRoutes><Projects/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects/:id' element={<ProtectedProjectManagerRoutes><ProjectDetails/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects/:id/addtask' element={<ProtectedProjectManagerRoutes><AddTask/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects/:id/tasks' element={<ProtectedProjectManagerRoutes><TasksTable/></ProtectedProjectManagerRoutes>}/>
      <Route path='projects/:id/tasks/:taskId' element={<ProtectedProjectManagerRoutes><TaskDetails/></ProtectedProjectManagerRoutes>}/>

      </Routes>
    </div>
  )
}

export default ProjectManagerRoutes
