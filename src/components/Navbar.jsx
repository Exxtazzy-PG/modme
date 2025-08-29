import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, DollarSign, BookOpen } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { DataContext } from '../context/DataContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useContext(LanguageContext);
  const { isDark } = useContext(ThemeContext);
  const { groups } = useContext(DataContext);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      id: 'dekabr',
      icon: BookOpen,
      label: 'Dekabr 16:00',
      path: '/group/dekabr'
    },
    {
      id: 'frontend-fevral',
      icon: BookOpen,
      label: 'Frontend Fevral 14:00',
      path: '/group/frontend-fevral'
    },
    {
      id: 'frontend-mart',
      icon: BookOpen,
      label: 'Frontend Mart 16:00',
      path: '/group/frontend-mart'
    },
    {
      id: 'salary',
      icon: DollarSign,
      label: 'Salary',
      path: '/salary'
    }
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className={`navbar ${isDark ? 'dark' : ''}`}>
      <div className="navbar-content">
        {navItems.map((item) => {
          const Icon = item.icon;
          const group = groups[item.id];
          const studentCount = group ? group.students.length : 0;
          
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <div className="nav-item-icon">
                <Icon size={20} />
              </div>
              <div className="nav-item-content">
                <span className="nav-item-label">{item.label}</span>
                {item.id !== 'salary' && (
                  <span className="nav-item-count">
                    {studentCount} {t('students')}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;