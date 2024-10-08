import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';  // Đảm bảo import đúng đường dẫn các component
import Login from './components/Login';
import Posts from './components/Posts';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route cho trang HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Route cho trang đăng nhập */}
        <Route path="/login" element={<Login />} />

        {/* Route cho trang Posts */}
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
};

export default App;
