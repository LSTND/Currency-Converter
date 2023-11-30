import { useEffect, useState } from "react";

import "./Header.scss";

const Header = () => {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
        );
        const data = await response.json();
        setExchangeRates(data);
      } catch (error) {
        console.error("Error while receiving data:", error);
      }
    };
    sendRequest();
  }, []);
  const getUSDRate = () => {
    const usdRateObject = exchangeRates.find(rate => rate.cc === 'USD');
    return usdRateObject ? usdRateObject.rate : 'Not Found';
  };
   const getEURRate = () => {
    const eurRateObject = exchangeRates.find(rate => rate.cc === 'USD');
    return eurRateObject ? eurRateObject.rate : 'Not Found';
  };
  return (
    <div className="header">
      <h2 className="header_title">Currency Counter</h2>
      <div className="currency">
        <div className="currency_content">
          <img src="../../../public/icon/USD.svg" alt="USD icon" />
          <p>{getUSDRate()}</p>
        </div>
        <div className="currency_content">
          <img src="../../../public/icon/EUR.svg" alt="EUR icon" />
          <p>{getEURRate()}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
