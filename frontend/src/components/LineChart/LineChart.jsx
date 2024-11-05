import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.map((item) => {
        const date = new Date(item[0]);
        dataCopy.push([
          date.toLocaleDateString(), // Convert timestamp to Date and then format it
          item[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart 
      chartType="LineChart" 
      data={data} 
      height="100%" 
      legendToggle 
    />
  );
};

LineChart.propTypes = {
  historicalData: PropTypes.shape({
    prices: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.number, // for the timestamp
          PropTypes.number // for the price
        ])
      )
    ).isRequired,
  }).isRequired,
};

export default LineChart;
