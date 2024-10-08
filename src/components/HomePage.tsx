import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì useHistory trong React Router v6

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Kiểm tra token để bảo vệ trang Home
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');  // Nếu không có token, điều hướng về trang login
    }
  }, [navigate]);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('accessToken');  // Xóa access token
    localStorage.removeItem('refreshToken');  // Xóa refresh token
    navigate('/login');  // Điều hướng về trang login
  };

  return (
    <div className="home-container">
      <h1>Welcome to My Home Page</h1>
      <button onClick={handleLogout}>Logout</button>  {/* Nút đăng xuất */}
    </div>
  );
};

export default HomePage;

