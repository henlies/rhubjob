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
import Manual from './components/Manual';
import Error403 from './components/403';
import { Layout } from 'antd';
import TrackStatus from './components/User/TrackStatus';

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
            <Route path="/manual" element={<Manual />} />
            <Route path="*" element={<Error403 />} />
          </Routes>
        </Fragment>
      </Router>
    );
  } else {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          {token && (
            <Fragment>
              <Sidebar role={role} per={per} />
              <Routes>
                {role === "ผู้ดูแลระบบ" && per === "ดูแลระบบ" && (
                  <>
                    <Route path="/" element={<DashboardAdmim />} />
                    <Route path="/control-post" element={<ControlPost />} />
                    <Route path="/control-comment" element={<ControlComment />} />
                    <Route path="/control-user" element={<ControlUser />} />
                    <Route path="*" element={<Error403 />} />
                  </>
                )}
                {role === "ผู้ดูแลระบบ" && per === "คัดกรองข้อความ" && (
                  <>
                    <Route path="/" element={<DashboardAdmim />} />
                    <Route path="/control-comment" element={<ControlComment />} />
                    <Route path="*" element={<Error403 />} />
                  </>
                )}
                {role === "ผู้ดูแลระบบ" && per === "จัดการข้อมูลผู้ใช้ระบบ" && (
                  <>
                    <Route path="/" element={<DashboardAdmim />} />
                    <Route path="/control-user" element={<ControlUser />} />
                    <Route path="*" element={<Error403 />} />
                  </>
                )}
                {role === "ผู้ใช้บริการ" && (
                  <>
                    <Route path="/" element={<DashboardUser />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/track-status" element={<TrackStatus />} />
                    <Route path="*" element={<Error403 />} />
                  </>
                )}
                {role === "ผู้ให้บริการ" && (
                  <>
                    <Route path="/" element={<DashboardUser />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/post-status" element={<PostStatus />} />
                    <Route path="*" element={<Error403 />} />
                  </>
                )}
              </Routes>
            </Fragment>
          )}
        </Layout>
      </Router>
    );
  }
};

export default App;