
import Sidebar from './components/Sidebar';

import { Routes, Route } from "react-router-dom";
import CompanyOverview from './pages/CompanyOverview';
import Home from './pages/Home';

const App = () => {

  

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">

      
      <Sidebar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='comapny-overview' element={<CompanyOverview />}></Route>
      </Routes>

    </div>
  );
};

export default App;