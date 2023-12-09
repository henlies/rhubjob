import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ControlComment from './components/Admin/ControlComment';
import ControlPost from './components/Admin/ControlPost';
import ControlUser from './components/Admin/ControlUser';
import DashboardAdmim from './components/Admin/DashboardAdmin';
import DashboardUser from './components/User/DashboardUser';
import Home from './components/User/Home';
import Signin from './components/Signin';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [per, setPer] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setRole(localStorage.getItem("role") || '');
      setPer(localStorage.getItem("per") || '');
    }
  }, []);

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
        </Routes>
      </Router>
    );
  } else {
    const isAdmin = role === "ผู้ดูแลระบบ";
    return (
      <Router>
        <div style={{ display: 'flex' }}>
          {token && (
            <Fragment>
              <Sidebar isAdmin={isAdmin} per={per} />
              <div style={{ flex: 1000 }}>
                <Routes>
                  {isAdmin && per === "ดูแลระบบ" && (
                    <>
                      <Route path="/" element={<DashboardAdmim />} />
                      <Route path="/control-post" element={<ControlPost />} />
                      <Route path="/control-comment" element={<ControlComment />} />
                      <Route path="/control-user" element={<ControlUser />} />
                    </>
                  )}
                  {isAdmin && per === "คัดกรองข้อความ" && (
                    <>
                      <Route path="/" element={<DashboardAdmim />} />
                      <Route path="/control-comment" element={<ControlComment />} />
                    </>
                  )}
                  {isAdmin && per === "จัดการข้อมูลผู้ใช้ระบบ" && (
                    <>
                      <Route path="/" element={<DashboardAdmim />} />
                      <Route path="/control-user" element={<ControlUser />} />
                    </>
                  )}
                  {!isAdmin && (
                    <>
                      <Route path="/" element={<DashboardUser />} />
                      <Route path="/home" element={<Home />} />
                    </>
                  )}
                </Routes>
              </div>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
};

export default App;