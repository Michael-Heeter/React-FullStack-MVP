import React, { useState, useEffect } from 'react';
import TopMain from './components/topmain.jsx';
import MainPage from './components/mainpage.jsx';
import Calendar from './components/calendar.jsx';
import TasksOfTheDay from './components/tasksoftheday.jsx';

function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isUserVisible, setIsUserVisible] = useState(true);
  const [showHideButtonVisible, setShowHideButtonVisible] = useState(true);
  const [dataFromDatabase, setDataFromDatabase] = useState({})

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleShowCalendar = () => {
    setSelectedDate(null);
    setShowCalendar(true);
  };

  const handleToggleCalendar = () => {
    setShowCalendar(prevState => !prevState); // Toggle the calendar visibility
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        setDataFromDatabase(data)
      } catch (err){
        console.log(err)
      }
    }
    fetchUsers()
  }, [])

  return (
    <>
      <TopMain isUserVisible={isUserVisible} setIsUserVisible={setIsUserVisible} />
      {isUserVisible && <MainPage MainPage={MainPage} />}
      {/* Conditionally render the show/hide button based on showHideButtonVisible */}
      {showHideButtonVisible && (
        <button onClick={handleToggleCalendar}>
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
      )}
      {showCalendar && (
        <Calendar
          onDateClick={handleDateClick}
          setSelectedDate={setSelectedDate}
          Calendar={Calendar}
        />
      )}
    </>
  );
}

export default App;