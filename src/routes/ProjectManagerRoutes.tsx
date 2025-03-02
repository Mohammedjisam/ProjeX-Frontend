import ProjectManagerSignup from '../pages/projectManager/ProjectManagerSignup';
import ProjectManagerLogin from '../pages/projectManager/ProjectManagerLogin';
import { Routes,Route } from 'react-router-dom';
import ProtectedProjectManagerLogin from '../private/projectManager/ProtectedProjectManagerLogin';

function ProjectManagerRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<ProtectedProjectManagerLogin><ProjectManagerSignup/></ProtectedProjectManagerLogin>}/>
      <Route path='*' element={<ProtectedProjectManagerLogin><ProjectManagerLogin/></ProtectedProjectManagerLogin>}/>
      </Routes>
    </div>
  )
}

export default ProjectManagerRoutes
