import { Provider } from 'react-redux';
import { Routes, Route ,BrowserRouter} from 'react-router-dom';
import { Toaster } from 'sonner';
import AdminRoutes from './routes/AdminRoutes';
import CompanyAdminRoutes from './routes/CompanyAdminRoutes';
import ManagerRoutes from './routes/ManagerRoutes';
import ProjectManagerRoutes from './routes/ProjectManagerRoutes';
import DeveloperRoutes from './routes/DeveloperRoutes';
import { store } from './redux/Store';



function App() {
  return (
<BrowserRouter>
<Toaster richColors position='top-right' />
<Provider store={store}>
      <Routes>
        <Route path='/companyadmin/*' element={<CompanyAdminRoutes />}/>
        <Route path='/manager/*' element={< ManagerRoutes/>}/>
        <Route path='/projectmanager/*' element={<ProjectManagerRoutes/>}/>
        <Route path='/developer/*' element={<DeveloperRoutes/>}/>
        <Route path='/admin/*' element={<AdminRoutes />}/>
      </Routes>
      </Provider>
</BrowserRouter>
  );
}

export default App;