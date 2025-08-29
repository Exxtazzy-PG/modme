import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import './Notification.css';

const Notification = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-icon">
        {getIcon()}
      </div>
      <div className="notification-message">
        {message}
      </div>
      <button className="notification-close" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;