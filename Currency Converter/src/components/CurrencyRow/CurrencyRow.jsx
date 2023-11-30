/* eslint-disable react/prop-types */
import Select from "react-select";
import "./CurrencyRow.scss";

const CurrencyRow = (props) => {
const {
    currencyOption,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundImage: `url(${state.data.image})`,
      backgroundSize: "25px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left center",
      paddingLeft: "30px",
    }),
  };

  return (
    <div className="currencyConvector">
      <Select
        value={currencyOption.find(
          (option) => option.value === selectedCurrency
        )}
        className="select"
        options={currencyOption}
        styles={customStyles}
        placeholder="Currency"
        onChange={onChangeCurrency}
      />
      <input
        type="number"
        placeholder="Enter value"
        className="input"
        value={amount}
        onChange={onChangeAmount} 
      />
    </div>
  );
};
export default CurrencyRow;
