import React, { useContext, useState } from 'react';
import { Users, Calendar, BookOpen, DollarSign } from 'lucide-react';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import './SalaryPage.css';

const SalaryPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { groups } = useContext(DataContext);
  const { isDark } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const calculateSalaryData = () => {
    let totalStudents = 0;
    let paidStudents = 0;
    let unpaidStudents = 0;

    Object.values(groups).forEach(group => {
      totalStudents += group.students.length;
      group.students.forEach(student => {
        if (student.hasPaid) {
          paidStudents++;
        } else {
          unpaidStudents++;
        }
      });
    });

    const pricePerStudent = 690000;
    const totalEarned = paidStudents * pricePerStudent;
    const potentialEarnings = unpaidStudents * pricePerStudent;

    return {
      totalStudents,
      paidStudents,
      unpaidStudents,
      totalEarned,
      potentialEarnings
    };
  };

  const salaryData = calculateSalaryData();

  const ProfileTab = () => (
    <div className="profile-content">
      <div className="profile-info">
        <div className="profile-avatar">
          <span>SX</span>
        </div>
        <div className="profile-details">
          <h2>Sayyorbek Xoliqov</h2>
          <p className="profile-id">ID: 12567891</p>
          <p className="profile-phone">Phone: (97) 935-47-07</p>
          <p className="profile-birthday">Birthday: 2005-06-03</p>
          <div className="profile-badges">
            <span className="badge teacher">Teacher</span>
            <span className="badge it-tat">IT TAT</span>
          </div>
        </div>
      </div>

      <div className="groups-section">
        <h3>{t('groups')}</h3>
        <div className="groups-grid">
          {Object.values(groups).map(group => (
            <div key={group.id} className="group-card">
              <div className="group-card-header">
                <h4>{group.name}</h4>
                <span className="student-count">{group.students.length}</span>
              </div>
              <div className="group-card-body">
                <p className="group-course">{group.course}</p>
                <p className="group-time">{group.time}</p>
                <p className="group-room">Room: Room #1</p>
                <p className="group-start">Start: 16:00</p>
              </div>
              <div className="group-students-preview">
                {group.students.slice(0, 5).map(student => (
                  <div key={student.id} className="student-preview">
                    <span className="student-name">{student.name}</span>
                    <span className="student-phone">{student.phone}</span>
                  </div>
                ))}
                {group.students.length > 5 && (
                  <div className="more-students">
                    +{group.students.length - 5} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SalaryTab = () => (
    <div className="salary-content">
      <div className="salary-stats">
        <div className="stat-card total">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>{salaryData.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>
        
        <div className="stat-card earned">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>{salaryData.totalEarned.toLocaleString()} UZS</h3>
            <p>Total Earned</p>
          </div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h3>{salaryData.potentialEarnings.toLocaleString()} UZS</h3>
            <p>Potential Earnings</p>
          </div>
        </div>
      </div>

      <div className="salary-table-section">
        <h3>Salary Breakdown</h3>
        <div className="salary-table-container">
          <table className="salary-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Group / Course</th>
                <th>Student</th>
                <th>Lessons / Present / Absent / Not Marked</th>
                <th>Setting amount</th>
                <th>Estimated amount</th>
                <th>Calc setting</th>
                <th>Salary type</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(groups).map((group, groupIndex) => 
                group.students.map((student, studentIndex) => (
                  <tr key={`${group.id}-${student.id}`}>
                    <td>{groupIndex * 10 + studentIndex + 1}</td>
                    <td>{group.name}</td>
                    <td>{student.name}</td>
                    <td>0 / 0 / 0 / 0</td>
                    <td>690,000 UZS</td>
                    <td>{student.hasPaid ? '690,000 UZS' : '0 UZS'}</td>
                    <td>Standard</td>
                    <td>Monthly</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {Object.values(groups).every(group => group.students.length === 0) && (
            <div className="no-data">
              <p>No Data</p>
            </div>
          )}
        </div>
        <div className="salary-total">
          <p>Total: {salaryData.totalEarned.toLocaleString()} UZS</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`salary-page ${isDark ? 'dark' : ''}`}>
      <Header />
      <div className="salary-container">
        <Navbar />
        <main className="salary-main">
          <div className="salary-header">
            <h1>Sayyorbek Xoliqov</h1>
            <div className="salary-tabs">
              <button 
                className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                PROFILE
              </button>
              <button 
                className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                History
              </button>
              <button 
                className={`tab ${activeTab === 'salary' ? 'active' : ''}`}
                onClick={() => setActiveTab('salary')}
              >
                Salary
              </button>
            </div>
          </div>

          <div className="salary-content">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'history' && (
              <div className="history-content">
                <p>History section - Coming soon!</p>
              </div>
            )}
            {activeTab === 'salary' && <SalaryTab />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SalaryPage;