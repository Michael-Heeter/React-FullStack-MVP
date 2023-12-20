//calendar.jsx
import { useState, useEffect } from 'react'
import TasksOfTheDay from './tasksoftheday';

const Calendar = (props) => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);
  

  const createCalendar = (year, month) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
  
    const firstDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
    const totalDays = daysInMonth + firstDayOfWeek;
  
    const weeks = Math.ceil(totalDays / 7);
    const calendarDates = [];
  
    let currentDate = new Date(firstDay);
    currentDate.setDate(currentDate.getDate() - firstDayOfWeek + 1);
  
    for (let i = 0; i < weeks; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (currentDate.getMonth() === firstDay.getMonth()) {
          week.push(new Date(currentDate));
        } else {
          week.push(null);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      calendarDates.push(week);
    }
  
    return calendarDates;
  };
  

  const handleDateClick = (date) => {
    if (date && date.dueDate) {
      console.log(date.dueDate.toDateString()); // Log the due_date when clicked
      props.setSelectedDate(date.dueDate);
      setSelectedDayTasks(date.tasks || []); // Set the tasks for the clicked date
    }
  };

  useEffect(() => {
    // Create the calendar when the year or month changes
    createCalendar(year, month);
  }, [year, month]);

  return (
    <div>
        <div>
            <button onClick={() => setYear(year - 1)}>Previous Year</button>
            <button onClick={() => setMonth(month === 1 ? 12 : month - 1)}>Previous Month</button>
            <button onClick={() => setMonth(month === 12 ? 1 : month + 1)}>Next Month</button>
            <button onClick={() => setYear(year + 1)}>Next Year</button>
        </div>
        <div>
            <h2>{`${new Date(year, month - 1, 1).toLocaleString('default', {
                month: 'long',
            })} ${year}`}</h2>
        </div>
        <table id="themonthlycalendar">
        <thead>
            <tr>
            <th>MO</th>
            <th>TU</th>
            <th>WE</th>
            <th>TH</th>
            <th>FR</th>
            <th>SA</th>
            <th>SU</th>
            </tr>
        </thead>
        <tbody>
        {createCalendar(year, month).map((week, index) => (
          <tr key={index}>
            {week.map((date, idx) => (
              <td key={idx} onClick={() => handleDateClick(date)}>
                {date ? (
                  <div>
                    {date.getDate()}
                    {/* Pass the tasks of the clicked date to TasksOfTheDay */}
                    {selectedDayTasks.length > 0 && <TasksOfTheDay tasks={selectedDayTasks} />}
                  </div>
                ) : (
                  <div style={{ visibility: 'hidden' }}></div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
        </table>
    </div>
    );
};

export default Calendar;
