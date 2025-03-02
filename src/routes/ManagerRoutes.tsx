import { Routes, Route } from 'react-router-dom';
import ManagerSignup from '../pages/manager/ManagerSignup';
import ManagerLogin from '../pages/manager/ManagerLogin';
import ProtectedManagerLogin from '../private/manger/ProtectedManagerLogin'

function ManagerRoutes() {
  return (
    <div>
      <Routes>
        <Route path='signup' element={<ProtectedManagerLogin><ManagerSignup /></ProtectedManagerLogin>} />
        <Route path="*" element={<ProtectedManagerLogin><ManagerLogin /></ProtectedManagerLogin>} />
      </Routes>
    </div>
  );
}

export default ManagerRoutes;
