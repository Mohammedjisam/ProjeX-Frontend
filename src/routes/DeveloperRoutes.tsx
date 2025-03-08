import DeveloperSignup from '../pages/developer/DeveloperSignup';
import DeveloperLogin from '../pages/developer/DeveloperLogin'
import { Routes,Route } from 'react-router-dom';
import ProtectedDeveloperLogin from '../private/developer/ProtectedDeveloperLogin';
import SetPasswordPage from '../components/developer/SetPasswordPage';
import ProtectedDeveloperRoutes from '../private/developer/ProtectedDeveloperRoutes';
import Dashboard from '../components/developer/Dashboard';
import Profile from '../components/developer/Profile';

function DeveloperRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<ProtectedDeveloperLogin><DeveloperSignup/></ProtectedDeveloperLogin>}/>
      <Route path='*' element={<ProtectedDeveloperLogin><DeveloperLogin/></ProtectedDeveloperLogin>}/>
      <Route path="set-password/:token" element={<SetPasswordPage />} />  
      <Route path='dashboard' element={<ProtectedDeveloperRoutes><Dashboard/></ProtectedDeveloperRoutes>}/>
      <Route path='profile' element={<ProtectedDeveloperRoutes><Profile/></ProtectedDeveloperRoutes>}/>

      </Routes>
    </div>
  )
}

export default DeveloperRoutes
