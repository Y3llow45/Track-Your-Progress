import { select, selectAll } from 'd3-selection';
import { timeDays, timeWeek, timeYear, timeMonths } from 'd3-time';
import React, { useEffect } from 'react';

const Home = () => {
  const width = 1000;
  const height = 800;
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

    function renderCalendar(data) {
      // Add day labels
      svg.selectAll(".dayLabel")
        .data(daysOfWeek)
        .enter()
        .append("text")
        .text(d => d)
        .attr("x", 0)
        .attr("y", (d, i) => (i + 1) * cellSize)
        .attr("dy", "-0.5em")
        .attr("class", "dayLabel");

      // Add month labels
      svg.selectAll(".monthLabel")
        .data(timeMonths(new Date(2024, 0, 1), new Date(2024, 11, 31)))
        .enter()
        .append("text")
        .text(d => d.toLocaleDateString('en-US', { month: 'short' }))
        .attr("x", (d, i) => (i + 1) * cellSize * 4 + cellSize * 3) // Adjusted position
        .attr("y", cellSize) // Moved down
        .attr("class", "monthLabel");

      // Render the calendar squares
      const squares = svg.selectAll(".day")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", d => (timeWeek.count(timeYear(d), d) % 53) * cellSize + cellSize * 3)
        .attr("y", d => d.getDay() * cellSize + cellSize * 2) // Adjusted position
        .attr("fill", d => monthColors[d.getMonth()])
        .attr("stroke", "white");

    }

    renderCalendar(yearData);

    select("body")
      .append("button")
      .text("Switch to Single Months")
      .on("click", function () {
        svg.selectAll("*").remove();
        for (let i = 0; i < 12; i++) {
          const monthData = timeDays(new Date(2024, i, 1), new Date(2024, i + 1, 0));
          renderCalendar(monthData);
        }
      });

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
