
// calendar.jsx
import React, { useState, useEffect } from 'react';
import TaskList from './taskslist';

const Calendar = (props) => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);
  const [displayDueDate, setDisplayDueDate] = useState(true);
  

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
    if (date) {
      props.setTaskListVisible(true);
      const id = date.toISOString().split('T')[0];
      console.log(`Clicked on date with ID: ${id}`);
      props.setSelectedDate(id);
      setSelectedDayTasks(date.tasks || []);
      props.setShowCalendar(false);
    }
  };


  useEffect(() => {
    // Create the calendar when the year or month changes
    createCalendar(year, month)
  }, [year, month]);

  const handleToggleClick = () => {
    setDisplayDueDate((prev) => !prev);
  };

  return (
    <div>
      <div style={{width: '30%', margin: '2rem auto'}}>
        <button className='stylethebutton' onClick={() => setYear(year - 1)}>Previous Year</button>
        <button className='stylethebutton' onClick={() => setMonth(month === 1 ? 12 : month - 1)}>Previous Month</button>
        <button className='stylethebutton' onClick={() => setMonth(month === 12 ? 1 : month + 1)}>Next Month</button>
        <button className='stylethebutton' onClick={() => setYear(year + 1)}>Next Year</button>
      </div>
      <div>
        <h2 style={{width: '15%', margin: '2rem auto'}}>{`${new Date(year, month - 1, 1).toLocaleString('default', {
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
                      <div id={date.toISOString().split('T')[0]}>
                        {date.getDate()}
                        {/* Conditional rendering based on date ID */}
                        {props.singleUserTasks.map((task) => {
                          const taskDate = displayDueDate ? new Date(task.due_date) : new Date(task.start_date);
                          const taskFormattedDate = taskDate.toISOString().split('T')[0];

                          if (taskFormattedDate === date.toISOString().split('T')[0]) {
                            return (
                              <div key={task.id} className="additional-content">
                                {task.name}
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
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
      <div><div>
      <button style={{ width: '7%', margin: '1rem auto', display: 'block' }} className='stylethebutton' onClick={handleToggleClick}>    Toggle Start/Due Dates
  </button>
</div>

</div>
      {/* Render TaskList component with selected date and tasks */}
      {props.taskListVisible && (
        <TaskList
          selectedDate={props.selectedDate}
          singleUserTasks={selectedDayTasks}
          setShowCalendar={props.setShowCalendar}
        />
      )}
    </div>
  );
};

export default Calendar;

