import { select } from 'd3-selection';
import { timeDays, timeWeek, timeYear, timeMonths } from 'd3-time';
import React, { useEffect } from 'react';

const Home = () => {
  const width = 1200; // Increased width to accommodate all weeks
  const height = 900; // Adjusted height to fit all weeks and months
  const cellSize = 20;
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const svg = select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "block")
      .style("margin", "auto");

    const yearData = timeDays(new Date(2024, 0, 1), new Date(2024, 11, 31));

    const monthColors = [
      '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00',
      '#ffff33', '#a65628', '#f781bf', '#999999', '#a6cee3',
      '#1f78b4', '#b2df8a'
    ];

    const monthPositions = {
      January: 6,
      February: 10,
      March: 14.5,
      April: 19.3,
      May: 23,
      June: 27.4,
      July: 32.1,
      August: 36.2,
      September: 40.3,
      October: 45.2,
      November: 49.2,
      December: 53.2
    };

    function renderCalendar(data) {
      // Add day labels
      svg.selectAll(".dayLabel")
        .data(daysOfWeek)
        .enter()
        .append("text")
        .text(d => d)
        .attr("x", 30)
        .attr("y", (d, i) => (i + 1) * cellSize + (cellSize + 1.1) * 3) // Adjusted position
        .attr("dy", "-0.5em")
        .attr("class", "dayLabel");

      // Add month labels
      svg.selectAll(".monthLabel")
        .data(timeMonths(new Date(2024, 0, 1), new Date(2024, 11, 31)))
        .enter()
        .append("text")
        .text(d => d.toLocaleDateString('en-US', { month: 'short' }))
        .attr("x", d => monthPositions[d.toLocaleDateString('en-US', { month: 'long' })] * cellSize) // Manually positioned
        .attr("y", cellSize * 2) // Adjusted position
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
        .attr("y", d => d.getDay() * cellSize + cellSize * 3) // Adjusted position
        .attr("fill", d => monthColors[d.getMonth()])
        .attr("stroke", "white");
    }

    renderCalendar(yearData);

    return () => {
      svg.remove(); // Clean up SVG when component unmounts
    };
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Hi</h1>
    </div>
  );
}

export default Home;
