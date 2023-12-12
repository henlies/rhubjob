import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ControlComment from './components/Admin/ControlComment';
import ControlPost from './components/Admin/ControlPost';
import ControlUser from './components/Admin/ControlUser';
import DashboardAdmim from './components/Admin/DashboardAdmin';
import DashboardUser from './components/User/DashboardUser';
import Post from './components/User/Post';
import Homie from './components/Home';
import Sidebar from './components/Sidebar';
import Petinfo from './components/Petinfo';
import Navbar from './components/Navbar';
import PostStatus from './components/User/PostStatus';

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
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homie />} />
            <Route path="/petinfo" element={<Petinfo />} />
          </Routes>
        </Fragment>
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
                      <Route path="/post" element={<Post />} />
                      <Route path="/post-status" element={<PostStatus />} />
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