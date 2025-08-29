import React, { useContext } from 'react';
import { HelpCircle, FileText } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { t } = useContext(LanguageContext);
  const { isDark } = useContext(ThemeContext);

  return (
    <footer className={`footer ${isDark ? 'dark' : ''}`}>
      <div className="footer-content">
        <div className="footer-links">
          <button className="footer-link">
            <HelpCircle size={16} />
            <span>{t('support')}</span>
          </button>
          <button className="footer-link">
            <FileText size={16} />
            <span>{t('documentation')}</span>
          </button>
        </div>
        <div className="footer-brand">
          <span>mod</span>
          <span className="brand-accent">me</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;