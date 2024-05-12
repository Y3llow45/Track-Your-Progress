import { select, selectAll } from 'd3-selection';
import { timeDays, timeWeek, timeYear, timeMonths, timeFormat } from 'd3-time';
import React, { useEffect } from 'react';

const Home = () => {
  const width = 800;
  const height = 600;
  const cellSize = 20;

  useEffect(() => {
    const svg = select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const yearData = timeDays(new Date(2024, 0, 1), new Date(2024, 11, 31));

    function renderCalendar(data) {
      const squares = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", d => timeWeek.count(timeYear(d), d) * cellSize)
        .attr("y", d => d.getDay() * cellSize)
        .attr("fill", "lightgray")
        .attr("stroke", "white");
      const months = svg.selectAll(".month")
        .data(timeMonths(new Date(2024, 0, 1), new Date(2024, 11, 31)))
        .enter()
        .append("text")
        .text(d => timeFormat("%B")(d))
        .attr("x", d => timeWeek.count(timeYear(d), d) * cellSize)
        .attr("y", -5)
        .attr("class", "month");
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
      <h1>Hi</h1>
    </div>
  );
}

export default Home;
