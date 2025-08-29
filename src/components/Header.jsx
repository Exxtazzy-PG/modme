import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Maximize2, 
  Minimize2, 
  HelpCircle, 
  Clock, 
  Bell, 
  BellOff,
  User
} from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import Modal from './Modal';
import './Header.css';

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const { currentLanguage, setLanguage, t } = useContext(LanguageContext);
  const { isDark } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const getCurrentTime = () => {
    const now = new Date();
    const uzbekTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Tashkent"}));
    return uzbekTime.toLocaleString('ru-RU', {
      timeZone: 'Asia/Tashkent',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    showNotification(
      notificationsEnabled ? t('notificationsDisabled') : t('notificationsEnabled'),
      'info'
    );
  };

  const handleProfileClick = () => {
    navigate('/salary');
  };

  return (
    <>
      <header className={`header ${isDark ? 'dark' : ''} ${isExpanded ? 'expanded' : ''}`}>
        <div className="header-left">
          <div className="logo">
            <span>IT TAT</span>
          </div>
        </div>

        <div className="header-center">
          <div className="language-switcher">
            {['en', 'ru', 'uz'].map(lang => (
              <button
                key={lang}
                className={currentLanguage === lang ? 'active' : ''}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="header-right">
          <button 
            className="header-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? t('collapse') : t('expand')}
          >
            {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          
          <button 
            className="header-btn"
            onClick={() => setShowHelpModal(true)}
            title={t('help')}
          >
            <HelpCircle size={20} />
          </button>
          
          <button 
            className="header-btn"
            onClick={() => setShowTimeModal(true)}
            title={t('currentTime')}
          >
            <Clock size={20} />
          </button>
          
          <button 
            className="header-btn"
            onClick={handleNotificationToggle}
            title={t('notifications')}
          >
            {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
          </button>
          
          <button 
            className="header-profile"
            onClick={handleProfileClick}
            title={t('profile')}
          >
            <User size={20} />
            <span>{user?.name}</span>
          </button>
        </div>
      </header>

      <Modal 
        isOpen={showTimeModal} 
        onClose={() => setShowTimeModal(false)}
        title={t('currentTime')}
      >
        <div className="time-display">
          <h3>{getCurrentTime()}</h3>
          <p>{t('uzbekistanTime')}</p>
        </div>
      </Modal>

      <Modal 
        isOpen={showHelpModal} 
        onClose={() => setShowHelpModal(false)}
        title={t('help')}
      >
        <div className="help-content">
          <p>{t('developmentMessage')}</p>
        </div>
      </Modal>
    </>
  );
};

export default Header;