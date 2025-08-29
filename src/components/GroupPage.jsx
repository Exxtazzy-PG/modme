import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import StudentList from './StudentList';
import AttendanceTable from './AttendanceTable';
import Modal from './Modal';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import './GroupPage.css';

const GroupPage = () => {
  const { groupId } = useParams();
  const { groups, addStudent } = useContext(DataContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    hasPaid: false
  });

  const group = groups[groupId];

  if (!group) {
    return <div>Group not found</div>;
  }

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudent.name && newStudent.phone) {
      addStudent(groupId, newStudent);
      setNewStudent({ name: '', phone: '', hasPaid: false });
      setShowAddStudent(false);
    }
  };

  return (
    <div className={`group-page ${isDark ? 'dark' : ''}`}>
      <Header />
      <div className="group-container">
        <Navbar />
        <main className="group-main">
          <div className="group-header">
            <h1>{group.name} - {group.course} - Sayyorbek Xoliqov</h1>
            <div className="group-actions">
              <button 
                className="theme-toggle"
                onClick={toggleTheme}
              >
                {isDark ? t('lightMode') : t('darkMode')}
              </button>
            </div>
          </div>

          <div className="group-info">
            <div className="info-grid">
              <div className="info-item">
                <label>{t('course')}:</label>
                <span>{group.course}</span>
              </div>
              <div className="info-item">
                <label>{t('teacher')}:</label>
                <span>Sayyorbek Xoliqov</span>
              </div>
              <div className="info-item">
                <label>{t('price')}:</label>
                <span>690 000 UZS</span>
              </div>
              <div className="info-item">
                <label>{t('time')}:</label>
                <span>{group.time}</span>
              </div>
              <div className="info-item">
                <label>{t('room')}:</label>
                <span>Room #1</span>
              </div>
              <div className="info-item">
                <label>{t('capacity')}:</label>
                <span>{group.students.length}</span>
              </div>
            </div>
          </div>

          <div className="group-content">
            <div className="content-tabs">
              <button className="tab active">{t('attendance')}</button>
              <button className="tab">{t('materials')}</button>
              <button className="tab">{t('exams')}</button>
            </div>

            <StudentList 
              students={group.students} 
              groupId={groupId}
            />
            
            <AttendanceTable 
              students={group.students}
              groupId={groupId}
            />

            <div className="add-student-section">
              <button 
                className="add-student-btn"
                onClick={() => setShowAddStudent(true)}
              >
                {t('addStudent')}
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />

      <Modal 
        isOpen={showAddStudent}
        onClose={() => setShowAddStudent(false)}
        title={t('addStudent')}
      >
        <form onSubmit={handleAddStudent} className="add-student-form">
          <div className="form-group">
            <label>{t('name')} *</label>
            <input
              type="text"
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('phone')} *</label>
            <input
              type="text"
              value={newStudent.phone}
              onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
              placeholder="+998 XX XXX XX XX"
              required
            />
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newStudent.hasPaid}
                onChange={(e) => setNewStudent({...newStudent, hasPaid: e.target.checked})}
              />
              {t('hasPaid')}
            </label>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setShowAddStudent(false)}>
              {t('cancel')}
            </button>
            <button type="submit">{t('addStudent')}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GroupPage;