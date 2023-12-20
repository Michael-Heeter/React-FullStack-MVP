import React, { useState, useEffect } from 'react';
import Loading from './components/loading.jsx'
import TopMain from './components/topmain.jsx';
import TopUsers from './components/topusers.jsx'
import MainPage from './components/mainpage.jsx';
import Calendar from './components/calendar.jsx';
import Users from './components/users.jsx'
import TasksOfTheDay from './components/tasksoftheday.jsx';

function App() {
  const [loading, setLoading] = useState(true)
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isUserVisible, setIsUserVisible] = useState(true);
  const [showHideButtonVisible, setShowHideButtonVisible] = useState(true);
  const [recievingUsers, setRecievingUsers] = useState([])
  const [singleUser, setSingleUser] = useState(null)
  const [singleUserTasks, setSingleUserTasks] = useState([])
  const [allUserClicked, setAllUserClicked] = useState(false)

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

  const getSingleUserTasks = async (id) => {
    const res = await fetch(`http://localhost:5000/api/usertasks/${id}`)
    const data = await res.json()
    setSingleUserTasks(data)
    console.log(data)
    setAllUserClicked(false)
    console.log(singleUserTasks)
  }

  const createUser = async () => {
    const res = await fetch(`http://localhost:5000/api/`)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users`)
        const data = await response.json()
        setRecievingUsers(data)
        setLoading(false)
      } catch (err){
        console.error(err)
      }
    }
    fetchUsers()
  }, [])

  if(loading){
    return <Loading />
  }

  if(!loading && allUserClicked){
    return (
      <>
        <TopMain setSingleUserTasks={setSingleUserTasks} isUserVisible={isUserVisible} setIsUserVisible={setIsUserVisible} setAllUserClicked={setAllUserClicked} recievingUsers={recievingUsers} setRecievingUsers={setRecievingUsers}/>
        {isUserVisible && <MainPage MainPage={MainPage} />}
        <Users Users={Users}
        setSingleUser={setSingleUser}
        setSingleUserTasks={setSingleUserTasks}
        recievingUsers={recievingUsers}
        setAllUserClicked={setAllUserClicked}
        getSingleUserTasks={getSingleUserTasks}
        />
      </>
    )
  }

  return (
    <>
      <TopMain isUserVisible={isUserVisible} setIsUserVisible={setIsUserVisible} setAllUserClicked={setAllUserClicked} />
      {isUserVisible && <MainPage MainPage={MainPage} />}
      {/* Conditionally render the show/hide button based on showHideButtonVisible */}
      {showHideButtonVisible && (
        <button onClick={handleToggleCalendar}>
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
      )}
      {showCalendar && (
        <Calendar
          getSingleUserTasks={getSingleUserTasks}
          singleUser={singleUser}
          singleUserTasks={singleUserTasks}
          onDateClick={handleDateClick}
          setSelectedDate={setSelectedDate}
          Calendar={Calendar}
        />
      )}
      <TasksOfTheDay TasksOfTheDay={TasksOfTheDay} singleUserTasks={singleUserTasks}/>
    </>
  );
}

export default App;