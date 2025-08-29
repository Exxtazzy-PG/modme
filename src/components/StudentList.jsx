import React, { useState, useContext } from 'react';
import { MoreHorizontal, Edit3, ToggleLeft, ToggleRight } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import Modal from './Modal';
import './StudentList.css';

const StudentList = ({ students, groupId }) => {
  const [filter, setFilter] = useState('A-Z');
  const [hoveredStudent, setHoveredStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', phone: '', hasPaid: false });
  
  const { updateStudent } = useContext(DataContext);
  const { t } = useContext(LanguageContext);
  const { isDark } = useContext(ThemeContext);

  const filters = ['A-Z', 'Paid First', 'Unpaid First'];

  const getSortedStudents = () => {
    let sorted = [...students];
    
    switch (filter) {
      case 'A-Z':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'Paid First':
        return sorted.sort((a, b) => (b.hasPaid ? 1 : 0) - (a.hasPaid ? 1 : 0));
      case 'Unpaid First':
        return sorted.sort((a, b) => (a.hasPaid ? 1 : 0) - (b.hasPaid ? 1 : 0));
      default:
        return sorted;
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditForm({
      name: student.name,
      phone: student.phone,
      hasPaid: student.hasPaid
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateStudent(groupId, editingStudent.id, editForm);
    setEditingStudent(null);
    setEditForm({ name: '', phone: '', hasPaid: false });
  };

  const togglePaymentStatus = (studentId, currentStatus) => {
    updateStudent(groupId, studentId, { hasPaid: !currentStatus });
  };

  const sortedStudents = getSortedStudents();

  return (
    <div className={`student-list ${isDark ? 'dark' : ''}`}>
      <div className="student-list-header">
        <div className="filter-section">
          <label>By</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            {filters.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="students-grid">
        {sortedStudents.map(student => (
          <div
            key={student.id}
            className={`student-card ${!student.hasPaid ? 'unpaid' : ''}`}
            onMouseEnter={() => setHoveredStudent(student)}
            onMouseLeave={() => setHoveredStudent(null)}
          >
            <div className="student-info">
              <div className="student-name">
                {student.name}
              </div>
              <div className="student-phone">
                {student.phone}
              </div>
              <div className={`payment-status ${student.hasPaid ? 'paid' : 'unpaid'}`}>
                {student.hasPaid ? t('paid') : t('unpaid')}
              </div>
            </div>
            
            <div className="student-actions">
              <button 
                className="action-btn"
                onClick={() => handleEdit(student)}
                title={t('edit')}
              >
                <Edit3 size={16} />
              </button>
              <button 
                className="action-btn"
                onClick={() => togglePaymentStatus(student.id, student.hasPaid)}
                title={t('togglePayment')}
              >
                {student.hasPaid ? 
                  <ToggleRight size={16} className="toggle-on" /> : 
                  <ToggleLeft size={16} className="toggle-off" />
                }
              </button>
            </div>

            {hoveredStudent?.id === student.id && (
              <div className="student-tooltip">
                <div className="tooltip-content">
                  <h4>{student.name}</h4>
                  <p>{student.phone}</p>
                  <p className={`status ${student.hasPaid ? 'paid' : 'unpaid'}`}>
                    {student.hasPaid ? t('paid') : t('unpaid')}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        title={t('editStudent')}
      >
        <form onSubmit={handleSaveEdit} className="edit-student-form">
          <div className="form-group">
            <label>{t('name')} *</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('phone')} *</label>
            <input
              type="text"
              value={editForm.phone}
              onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={editForm.hasPaid}
                onChange={(e) => setEditForm({...editForm, hasPaid: e.target.checked})}
              />
              {t('hasPaid')}
            </label>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setEditingStudent(null)}>
              {t('cancel')}
            </button>
            <button type="submit">{t('save')}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentList;