import DeveloperSignup from '../pages/developer/DeveloperSignup';
import DeveloperLogin from '../pages/developer/DeveloperLogin'
import { Routes,Route } from 'react-router-dom';
import ProtectedDeveloperLogin from '../private/developer/ProtectedDeveloperLogin';
import SetPasswordPage from '../components/developer/SetPasswordPage';
import ProtectedDeveloperRoutes from '../private/developer/ProtectedDeveloperRoutes';
import Profile from '../components/developer/Profile';import { Dashboard } from '../pages/developer/Dashboard';
import TaskBoard from '../pages/developer/TaskBoard';
import TaskDetailsPage from '../pages/developer/TaskDetailsPage';

function DeveloperRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<ProtectedDeveloperLogin><DeveloperSignup/></ProtectedDeveloperLogin>}/>
      <Route path='*' element={<ProtectedDeveloperLogin><DeveloperLogin/></ProtectedDeveloperLogin>}/>
      <Route path="set-password/:token" element={<SetPasswordPage />} />  
      <Route path='dashboard' element={<ProtectedDeveloperRoutes><Dashboard/></ProtectedDeveloperRoutes>}/>
      <Route path='profile' element={<ProtectedDeveloperRoutes><Profile/></ProtectedDeveloperRoutes>}/>
      <Route path='tasks' element={<ProtectedDeveloperRoutes><TaskBoard/></ProtectedDeveloperRoutes>}/>
      <Route path='tasks/:taskId' element={<ProtectedDeveloperRoutes><TaskDetailsPage/></ProtectedDeveloperRoutes>}/>

      </Routes>
    </div>
  )
}

export default DeveloperRoutes
