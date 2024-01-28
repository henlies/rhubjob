import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';


import Homie from './components/Home';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Petinfo from './components/Petinfo';
import Manual from './components/Manual';

import DashboardAdmim from './components/Admin/DashboardAdmin';
import ControlComment from './components/Admin/ControlComment';
import ControlPost from './components/Admin/ControlPost';
import ControlUser from './components/Admin/ControlUser';

import Profile from './components/User/ServiceUser/Profile';
import Post from './components/User/ServiceUser/Post';
import TrackStatus from './components/User/ServiceUser/TrackStatus';

import PostStatus from './components/User/ServiceProvider/PostStatus';
import Postpro from './components/User/ServiceProvider/Postpro';

import Error403 from './components/403';
import DashboardUser from './components/User/DashboardUser';

const App: React.FC = () => {
  const petid = localStorage.getItem("petid")
  const addressid = localStorage.getItem("addressid")

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
                    <Route path="/profile" element={<Profile />} />
                    {(petid !== "0" || addressid !== "0") && (
                      <>
                        <Route path="/post" element={<Post />} />
                        <Route path="/track-status" element={<TrackStatus />} />
                      </>
                    )}
                    <Route path="*" element={<Error403 />} />
                  </>
                )}
                {role === "ผู้ให้บริการ" && (
                  <>
                    <Route path="/" element={<DashboardUser />} />
                    <Route path="/post" element={<Postpro />} />
                    <Route path="/post-status/:postId" element={<PostStatus />} />
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