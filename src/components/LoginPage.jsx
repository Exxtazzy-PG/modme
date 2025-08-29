import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { NotificationContext } from '../context/NotificationContext';
import { Eye, EyeOff } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const { currentLanguage, setLanguage, t } = useContext(LanguageContext);
  const { showNotification } = useContext(NotificationContext);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate fields
    if (!phone || !password) {
      showNotification(t('fillAllFields'), 'error');
      setIsLoading(false);
      return;
    }

    // Check credentials
    if (phone === '50 881 30 13' && password === '8813013') {
      showNotification(t('loginSuccess'), 'success');
      login({ 
        name: 'Sayyorbek Xoliqov', 
        phone: '+998 50 881 30 13',
        role: 'teacher'
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      showNotification(t('invalidCredentials'), 'error');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="language-selector">
            <button 
              className={currentLanguage === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={currentLanguage === 'ru' ? 'active' : ''}
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
            <button 
              className={currentLanguage === 'uz' ? 'active' : ''}
              onClick={() => setLanguage('uz')}
            >
              UZ
            </button>
          </div>
          <div className="login-banner">
            <div className="it-tat-brand">
              <div className="brand-logo">
                <span>IT TAT</span>
              </div>
              <div className="brand-text">
                <p>{t('qualityEducation')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="form-logo">
              <div className="logo-circle">
                <span>IT TAT</span>
              </div>
            </div>
            
            <h2>{t('login')}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t('phone')} *</label>
                <div className="phone-input">
                  <span className="phone-prefix">+998</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="97 935 97 07"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t('password')} *</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? t('loading') : t('login').toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;