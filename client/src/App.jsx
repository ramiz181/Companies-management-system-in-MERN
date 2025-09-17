
import Sidebar from './components/Sidebar';

import { Routes, Route } from "react-router-dom";
import CompanyOverview from './pages/CompanyPage';
import Home from './pages/OverviewPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {

  return (
    <div className="">
      {/* <Sidebar /> */}
      <Routes>

        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path='/company-overview' element={
          <ProtectedRoute>
            <CompanyOverview />
          </ProtectedRoute>
        } />

        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>

    </div>
  );
};

export default App;