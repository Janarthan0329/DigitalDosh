import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./CurrencyConverter.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  const currencies = ["USD", "EUR", "INR", "LKR", "GBP", "CAD"];

  const fetchExchangeRate = () => {
    fetch(`https://v6.exchangerate-api.com/v6/039ad08d5ce08cff72b504d6/pair/${fromCurrency}/${toCurrency}`)
      .then(response => response.json())
      .then(data => {
        setExchangeRate(data.conversion_rate);
        updateChartData(data.conversion_rate);
      })
      .catch(error => console.error("Error fetching exchange rates:", error));
  };

  useEffect(() => {
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setResult((amount * exchangeRate).toFixed(2));
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);

  const updateChartData = (rate) => {
    setChartData(prevData => {
      const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
      const newData = [...prevData.data, rate];

      if (newLabels.length > 10) {
        newLabels.shift();
        newData.shift();
      }

      return { labels: newLabels, data: newData };
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `${fromCurrency} to ${toCurrency} Exchange Rate` }
    }
  };

  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Exchange Rate",
        data: chartData.data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="converter-container">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="amount-input"
        />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>to</span>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="result">
        <p>Converted Amount:</p>
        <h3>{result} {toCurrency}</h3>
      </div>
      <div className="chart-container">
        <Line data={lineChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CurrencyConverter;
