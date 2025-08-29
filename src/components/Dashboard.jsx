import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-container">
        <Navbar />
        <main className="dashboard-main">
          <div className="welcome-message">
            <h1>Добро пожаловать, {user.name}!</h1>
            <p>Выберите группу для работы из меню слева</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;