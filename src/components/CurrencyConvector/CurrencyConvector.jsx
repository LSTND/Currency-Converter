import { useEffect, useState } from "react";
import CurrencyRow from "../CurrencyRow/CurrencyRow";
import "./CurrencyConvector.scss";

const CurrencyConvector = () => {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
      );
      const data = await response.json();

      const hasUAH = data.some(({ cc }) => cc === "UAH");
      if (!hasUAH) {
        data.push({
          cc: "UAH",
          txt: "Гривня",
          image: "/icon/UAH.svg",
        });
      }
      const filteredOptions = data
        .filter(({ cc }) => ["USD", "EUR", "UAH"].includes(cc))
        .map(({ cc, txt, rate }) => ({
          value: cc,
          label: txt,
          rate: rate || 1,
          image: `/icon/${cc}.svg`,
        }));

      setCurrencyOption(filteredOptions);
    };

    sendRequest();
  }, []);

  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption.value);
    const result = convertCurrency(selectedOption.value, toCurrency, amount);
    setConvertedAmount(result);
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption.value);
    const result = convertCurrency(fromCurrency, selectedOption.value, amount);
    setConvertedAmount(result);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    const result = convertCurrency(fromCurrency, toCurrency, value);
    setConvertedAmount(result);
  };

  const convertCurrency = (fromCurr, toCurr, amountToConvert, isReverse) => {
    const fromRateObject = currencyOption.find(
      (option) => option.value === fromCurr
    );
    const toRateObject = currencyOption.find(
      (option) => option.value === toCurr
    );

    if (fromRateObject && toRateObject) {
      const fromRate =
        fromRateObject.value === "UAH" ? 1 : fromRateObject.rate || 1;
      const toRate = toRateObject.value === "UAH" ? 1 : toRateObject.rate || 1;

      const result = isReverse
        ? (amountToConvert / fromRate) * toRate
        : (amountToConvert / toRate) * fromRate;

      return Number(result.toFixed(2));
    }

    return 0;
  };

  const handleAmountChangeForConversion = (e) => {
    const value = e.target.value;
    setConvertedAmount(value);
    const result = convertCurrency(toCurrency, fromCurrency, value, true);
    setAmount(result);
  };

  return (
    <div className="convector_container">
      <CurrencyRow
        currencyOption={currencyOption}
        selectedCurrency={fromCurrency}
        onChangeCurrency={handleFromCurrencyChange}
        amount={amount}
        onChangeAmount={handleAmountChange}
      />
      <img
        src="/Currency-Converter/icon/arrowConvector.svg"
        alt="arrow"
        className="convectorBtn"
      />
      <CurrencyRow
        currencyOption={currencyOption}
        selectedCurrency={toCurrency}
        onChangeCurrency={handleToCurrencyChange}
        amount={convertedAmount}
        onChangeAmount={handleAmountChangeForConversion}
      />
    </div>
  );
};

export default CurrencyConvector;
