import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const initialGroups = {
  'dekabr': {
    id: 'dekabr',
    name: 'Dekabr 16:00',
    course: 'Frontend [1.5]',
    time: 'Odd days • 16:00',
    students: [
      { id: 1, name: 'Abdullayev Sardor', phone: '(91) 545-48-46', hasPaid: true, attendance: {} },
      { id: 2, name: 'Karimov Jasur', phone: '(99) 774-73-13', hasPaid: false, attendance: {} },
      { id: 3, name: 'Nazarov Bexruz', phone: '(94) 675-35-33', hasPaid: true, attendance: {} }
    ]
  },
  'frontend-fevral': {
    id: 'frontend-fevral',
    name: 'Frontend Fevral 14:00',
    course: 'Frontend',
    time: 'Even days • 14:00',
    students: [
      { id: 4, name: 'Ismoilov Sayyoр', phone: '(93) 739-99-23', hasPaid: true, attendance: {} },
      { id: 5, name: 'Mahmudjonov Lazizjon', phone: '(97) 395-26-52', hasPaid: true, attendance: {} },
      { id: 6, name: 'Muhammadaliyev Ibrahim', phone: '(98) 592-86-56', hasPaid: false, attendance: {} },
      { id: 7, name: 'Sulaymonov Muhammadjon', phone: '(98) 954-24-52', hasPaid: true, attendance: {} }
    ]
  },
  'frontend-mart': {
    id: 'frontend-mart',
    name: 'Frontend Mart 16:00',
    course: 'Frontend',
    time: 'Even days • 16:00',
    students: [
      { id: 8, name: 'Abdurasulov Islom', phone: '(91) 545-48-46', hasPaid: true, attendance: {} },
      { id: 9, name: 'Akbarov Aliasgar', phone: '(99) 774-73-13', hasPaid: true, attendance: {} },
      { id: 10, name: 'Attoyev Faridun', phone: '(94) 675-35-33', hasPaid: false, attendance: {} },
      { id: 11, name: 'G\'ulomova Zilola', phone: '(93) 490-15-30', hasPaid: false, attendance: {} },
      { id: 12, name: 'Raxmonov Saiddavron', phone: '(97) 925-50-02', hasPaid: true, attendance: {} },
      { id: 13, name: 'Sadullayev Sanjar', phone: '(97) 914-16-72', hasPaid: true, attendance: {} }
    ]
  }
};

export const DataProvider = ({ children }) => {
  const [groups, setGroups] = useState(initialGroups);

  const addStudent = (groupId, studentData) => {
    setGroups(prev => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        students: [
          ...prev[groupId].students,
          {
            id: Date.now(),
            ...studentData,
            attendance: {}
          }
        ]
      }
    }));
  };

  const updateStudent = (groupId, studentId, updates) => {
    setGroups(prev => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        students: prev[groupId].students.map(student =>
          student.id === studentId ? { ...student, ...updates } : student
        )
      }
    }));
  };

  const updateAttendance = (groupId, studentId, date, status) => {
    setGroups(prev => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        students: prev[groupId].students.map(student =>
          student.id === studentId 
            ? {
                ...student,
                attendance: {
                  ...student.attendance,
                  [date]: status
                }
              }
            : student
        )
      }
    }));
  };

  return (
    <DataContext.Provider value={{
      groups,
      addStudent,
      updateStudent,
      updateAttendance
    }}>
      {children}
    </DataContext.Provider>
  );
};