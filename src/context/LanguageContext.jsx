import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    login: 'Login',
    phone: 'Phone',
    password: 'Password',
    fillAllFields: 'Please fill in all fields',
    loginSuccess: 'Successfully logged in!',
    invalidCredentials: 'Invalid credentials',
    loading: 'Loading...',
    qualityEducation: 'Quality education for the new era',
    expand: 'Expand',
    collapse: 'Collapse',
    help: 'Help',
    currentTime: 'Current Time',
    notifications: 'Notifications',
    profile: 'Profile',
    uzbekistanTime: 'Uzbekistan Time',
    developmentMessage: 'In development, will be available soon!',
    notificationsDisabled: 'Notifications disabled',
    notificationsEnabled: 'Notifications enabled',
    students: 'students',
    course: 'Course',
    teacher: 'Teacher',
    price: 'Price',
    time: 'Time',
    room: 'Room',
    capacity: 'Capacity',
    attendance: 'Attendance',
    materials: 'Online lessons and materials',
    exams: 'Exams',
    addStudent: 'Add Student',
    name: 'Name',
    cancel: 'Cancel',
    hasPaid: 'Has paid',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    support: 'Support',
    documentation: 'Documentation'
  },
  ru: {
    login: 'Вход',
    phone: 'Телефон',
    password: 'Пароль',
    fillAllFields: 'Пожалуйста, заполните все поля',
    loginSuccess: 'Успешно авторизовались!',
    invalidCredentials: 'Неверные данные',
    loading: 'Загрузка...',
    qualityEducation: 'Качественное образование новой эры',
    expand: 'Развернуть',
    collapse: 'Свернуть',
    help: 'Помощь',
    currentTime: 'Текущее время',
    notifications: 'Уведомления',
    profile: 'Профиль',
    uzbekistanTime: 'Время Узбекистана',
    developmentMessage: 'В разработке, совсем скоро будет доступно!',
    notificationsDisabled: 'Уведомления отключены',
    notificationsEnabled: 'Уведомления включены',
    students: 'студентов',
    course: 'Курс',
    teacher: 'Преподаватель',
    price: 'Цена',
    time: 'Время',
    room: 'Комната',
    capacity: 'Вместимость',
    attendance: 'Посещаемость',
    materials: 'Онлайн уроки и материалы',
    exams: 'Экзамены',
    addStudent: 'Добавить студента',
    name: 'Имя',
    cancel: 'Отмена',
    hasPaid: 'Оплачено',
    darkMode: 'Темная тема',
    lightMode: 'Светлая тема',
    support: 'Поддержка',
    documentation: 'Документация'
  },
  uz: {
    login: 'Kirish',
    phone: 'Telefon',
    password: 'Parol',
    fillAllFields: 'Iltimos, barcha maydonlarni to\'ldiring',
    loginSuccess: 'Muvaffaqiyatli kirildi!',
    invalidCredentials: 'Noto\'g\'ri ma\'lumotlar',
    loading: 'Yuklanmoqda...',
    qualityEducation: 'Yangi davrning sifatli ta\'limi',
    expand: 'Kengaytirish',
    collapse: 'Yig\'ish',
    help: 'Yordam',
    currentTime: 'Joriy vaqt',
    notifications: 'Bildirishnomalar',
    profile: 'Profil',
    uzbekistanTime: 'O\'zbekiston vaqti',
    developmentMessage: 'Ishlab chiqilmoqda, tez orada mavjud bo\'ladi!',
    notificationsDisabled: 'Bildirishnomalar o\'chirildi',
    notificationsEnabled: 'Bildirishnomalar yoqildi',
    students: 'talabalar',
    course: 'Kurs',
    teacher: 'O\'qituvchi',
    price: 'Narx',
    time: 'Vaqt',
    room: 'Xona',
    capacity: 'Sig\'im',
    attendance: 'Davomat',
    materials: 'Onlayn darslar va materiallar',
    exams: 'Imtihonlar',
    addStudent: 'Talaba qo\'shish',
    name: 'Ism',
    cancel: 'Bekor qilish',
    hasPaid: 'To\'langan',
    darkMode: 'Qorong\'u rejim',
    lightMode: 'Yorug\' rejim',
    support: 'Yordam',
    documentation: 'Hujjatlar'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  const setLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};