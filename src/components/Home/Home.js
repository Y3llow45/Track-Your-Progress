import React, { useState, useEffect } from 'react';
import { select } from 'd3-selection';
import { timeDays, timeWeek, timeYear } from 'd3-time';
import { format } from 'd3-format';

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityName, setActivityName] = useState('');
  const [activityColor, setActivityColor] = useState('#000000');

  const width = 800;
  const height = 600;
  const cellSize = 20;
  const yearData = timeDays(new Date(2024, 0, 1), new Date(2024, 11, 31));
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const svg = select("#calendar")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("margin", "auto");

    renderCalendar(yearData, svg);

    return () => {
      svg.remove();
    };
  }, [activities, selectedActivity]);

  function renderCalendar(data, svg) {
    svg.selectAll("*").remove();

    // Add day labels
    svg.selectAll(".dayLabel")
      .data(daysOfWeek)
      .enter()
      .append("text")
      .text(d => d)
      .attr("x", 10)
      .attr("y", (d, i) => (i + 1) * cellSize + cellSize * 3)
      .attr("dy", "-0.5em")
      .attr("class", "dayLabel");

    // Add month labels
    svg.selectAll(".monthLabel")
      .data(monthLabels)
      .enter()
      .append("text")
      .text(d => d)
      .attr("x", (d, i) => i * cellSize * 4 + cellSize * 4)
      .attr("y", cellSize * 2)
      .attr("class", "monthLabel");

    // Render the calendar squares
    svg.selectAll(".day")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", d => (timeWeek.count(timeYear(d), d) % 53) * cellSize + cellSize * 4)
      .attr("y", d => d.getDay() * cellSize + cellSize * 3)
      .attr("fill", "lightgray")
      .attr("stroke", "white")
      .on("click", function (event, d) {
        if (selectedActivity) {
          select(this).attr("fill", selectedActivity.color);
        }
      });
  }

  function handleAddActivity() {
    setActivities([...activities, { name: activityName, color: activityColor }]);
    setActivityName('');
    setActivityColor('#000000');
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Activity Tracker</h1>
      <div>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Activity Name"
        />
        <input
          type="color"
          value={activityColor}
          onChange={(e) => setActivityColor(e.target.value)}
        />
        <button onClick={handleAddActivity}>Add Activity</button>
      </div>
      <div>
        <h2>Activities</h2>
        <ul>
          {activities.map((activity, index) => (
            <li key={index} style={{ cursor: 'pointer', color: activity.color }}
              onClick={() => setSelectedActivity(activity)}>
              {activity.name}
            </li>
          ))}
        </ul>
      </div>
      <div id="calendar"></div>
    </div>
  );
};

export default Home;
