import './App.css';
import { Route, Routes} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'


import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminPanel from './pages/admin/AdminPanel';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          {/* admin routers */}
          
          <Route element={<AdminLoginPage />} path="/admin" />
          <Route element={<AdminPanel />} path="/admin/panel" />

          {/* user routers */}

          <Route element={<LoginPage />} path='/' exact />
          <Route element={<HomePage />} path="/home" />
          <Route element={<SignUp />} path="/register" />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
