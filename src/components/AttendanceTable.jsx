import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Check, X } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import './AttendanceTable.css';

const AttendanceTable = ({ students, groupId }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoveredCell, setHoveredCell] = useState(null);
  
  const { updateAttendance } = useContext(DataContext);
  const { t } = useContext(LanguageContext);
  const { isDark } = useContext(ThemeContext);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDatesForMonth = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dates = [];
    
    for (let day = 1; day <= daysInMonth; day += 2) {
      dates.push(new Date(currentYear, currentMonth, day));
    }
    
    return dates;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getLessonInfo = (index) => {
    const lessonNumber = index + 1;
    if (lessonNumber % 13 === 12 || lessonNumber % 13 === 0) {
      return { type: 'practice', label: 'Amalyot' };
    }
    return { type: 'lesson', label: 'Lesson' };
  };

  const handleAttendanceClick = (studentId, date, currentStatus) => {
    let newStatus;
    if (currentStatus === 'present') {
      newStatus = 'absent';
    } else if (currentStatus === 'absent') {
      newStatus = null;
    } else {
      newStatus = 'present';
    }
    
    updateAttendance(groupId, studentId, date, newStatus);
  };

  const goToCurrentMonth = () => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  };

  const dates = getDatesForMonth();

  return (
    <div className={`attendance-table ${isDark ? 'dark' : ''}`}>
      <div className="attendance-header">
        <div className="month-navigation">
          <button 
            className="nav-btn"
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="current-month">
            {months[currentMonth]} {currentYear}
          </span>
          
          <button 
            className="nav-btn"
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <button className="current-btn" onClick={goToCurrentMonth}>
          <Calendar size={16} />
          Current
        </button>
      </div>

      <div className="attendance-table-container">
        <table className="attendance-table-main">
          <thead>
            <tr>
              <th className="name-column">{t('name')}</th>
              <th className="topic-column">{t('topic')}</th>
              {dates.map((date, index) => {
                const lessonInfo = getLessonInfo(index);
                return (
                  <th key={date.toISOString()} className="date-column">
                    <div className="date-header">
                      <div className="date-day">{date.getDate()}</div>
                      <div className="date-month">
                        {months[date.getMonth()].slice(0, 3)}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
            <tr className="topic-row">
              <td></td>
              <td className="topic-cell">
                <span className="topic-badge">analyst</span>
              </td>
              {dates.map((date, index) => {
                const lessonInfo = getLessonInfo(index);
                return (
                  <td key={`topic-${date.toISOString()}`} className="topic-cell">
                    <span className={`topic-badge ${lessonInfo.type}`}>
                      {lessonInfo.label}
                    </span>
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="student-row">
                <td className="student-name-cell">
                  <div className="student-avatar">
                    <span>{student.name.charAt(0)}</span>
                  </div>
                  <span>{student.name}</span>
                </td>
                <td className="status-cell">
                  <div className={`status-indicator ${student.hasPaid ? 'paid' : 'unpaid'}`}>
                    {student.hasPaid ? 'Was' : 'Not'}
                  </div>
                </td>
                {dates.map(date => {
                  const dateKey = formatDate(date);
                  const attendance = student.attendance[dateKey];
                  const cellKey = `${student.id}-${dateKey}`;
                  
                  return (
                    <td 
                      key={cellKey} 
                      className="attendance-cell"
                      onMouseEnter={() => setHoveredCell(cellKey)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div className="attendance-controls">
                        {hoveredCell === cellKey ? (
                          <div className="control-buttons">
                            <button
                              className="control-btn present-btn"
                              onClick={() => handleAttendanceClick(student.id, dateKey, attendance)}
                              title="Mark as present"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              className="control-btn absent-btn"
                              onClick={() => handleAttendanceClick(student.id, dateKey, attendance)}
                              title="Mark as absent"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className={`attendance-status ${attendance || 'unmarked'}`}>
                            {attendance === 'present' && 'Was'}
                            {attendance === 'absent' && 'Not'}
                            {!attendance && <div className="empty-circle"></div>}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;