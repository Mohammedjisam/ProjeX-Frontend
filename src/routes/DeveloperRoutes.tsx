import DeveloperSignup from '../pages/developer/DeveloperSignup';
import DeveloperLogin from '../pages/developer/DeveloperLogin'
import { Routes,Route } from 'react-router-dom';
import ProtectedDeveloperLogin from '../private/developer/ProtectedDeveloperLogin';

function DeveloperRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<ProtectedDeveloperLogin><DeveloperSignup/></ProtectedDeveloperLogin>}/>
      <Route path='*' element={<ProtectedDeveloperLogin><DeveloperLogin/></ProtectedDeveloperLogin>}/>
      </Routes>
    </div>
  )
}

export default DeveloperRoutes
