
import Sidebar from './components/Sidebar';
import Test from './components/Test';

import { Routes, Route } from "react-router-dom";
import CompanyOverview from './pages/CompanyOverview';
import DashboardPage from './GPT-code/DashboardPage';
import CompaniesPage from './GPT-code/CompaniesPage';

const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}

      <Sidebar />

      <Routes>
        <Route path='/' element={<Test />}></Route>
        <Route path='comapny-overview' element={<CompanyOverview />}></Route>
      </Routes>

      {/* <div className="app-container">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
        </Routes>
      </div> */}

      {/* <Test /> */}
    </div>
  );
};

export default App;
