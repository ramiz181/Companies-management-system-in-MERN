
import Sidebar from './components/Sidebar';

import { Routes, Route } from "react-router-dom";
import CompanyPage from './pages/CompanyPage';
import OverviewPage from './pages/OverviewPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {

  return (
    <div className="max-w-screen-xl m-auto">
      {/* <Sidebar /> */}
      <Routes>

        <Route path='/' element={
          <ProtectedRoute>
            <OverviewPage />
          </ProtectedRoute>
        } />

        <Route path='/company-overview' element={
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        } />

        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>

    </div>
  );
};

export default App;