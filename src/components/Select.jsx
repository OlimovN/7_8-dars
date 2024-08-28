import React, { useState, useEffect } from "react";
import DataJson from "../assets/country-currency.json";

const CurrencyConverter = () => {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState(null);
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [openDropdownFrom, setOpenDropdownFrom] = useState(false);
  const [openDropdownTo, setOpenDropdownTo] = useState(false);

  useEffect(() => {
    const allCurrencies = DataJson.map((country) => {
      const currencyCode = country.currencies
        ? Object.keys(country.currencies)[0]
        : null;
      if (currencyCode && country.currencies[currencyCode]) {
        return {
          ...country,
          code: currencyCode,
          ...country.currencies[currencyCode],
        };
      }
      return null;
    }).filter(Boolean);
    setCurrencies(allCurrencies);
    if (allCurrencies.length > 0) {
      setSelectedCurrencyFrom(allCurrencies[0]);
      setSelectedCurrencyTo(allCurrencies[1] || allCurrencies[0]);
    }
  }, []);

  const handleAmountChange = (e) => setInputAmount(e.target.value);

  const handleConvert = () => {
    if (selectedCurrencyFrom && selectedCurrencyTo && inputAmount) {
      const rateFromUSD = parseFloat(selectedCurrencyFrom.rateToUSD) || 1;
      const rateToUSD = parseFloat(selectedCurrencyTo.rateToUSD) || 1;
      const amountInUSD = inputAmount / rateFromUSD;
      const converted = amountInUSD * rateToUSD;
      setConvertedAmount(converted.toFixed(2));
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg space-y-4 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Currency Converter
      </h1>

      <div className="flex items-center justify-between w-full space-x-4">
        <div className="relative w-1/2">
          <label className="text-gray-600 font-semibold mb-1 block">From</label>
          <div
            className="border rounded-lg p-3 flex items-center justify-between cursor-pointer"
            onClick={() => setOpenDropdownFrom(!openDropdownFrom)}
          >
            {selectedCurrencyFrom ? (
              <>
                <img
                  className="w-6 h-6 rounded-full mr-2"
                  src={selectedCurrencyFrom.flag}
                  alt={`${selectedCurrencyFrom.name} flag`}
                />
                <span>
                  {selectedCurrencyFrom.code} - {selectedCurrencyFrom.name}
                </span>
              </>
            ) : (
              "Select Currency"
            )}
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          {openDropdownFrom && (
            <ul className="absolute z-10 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto mt-2 w-full">
              {currencies.map((currency, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedCurrencyFrom(currency);
                    setOpenDropdownFrom(false);
                  }}
                >
                  <img
                    className="w-6 h-6 rounded-full mr-2"
                    src={currency.flag}
                    alt={`${currency.name} flag`}
                  />
                  <span>
                    {currency.code} - {currency.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative w-1/2">
          <label className="text-gray-600 font-semibold mb-1 block">To</label>
          <div
            className="border rounded-lg p-3 flex items-center justify-between cursor-pointer"
            onClick={() => setOpenDropdownTo(!openDropdownTo)}
          >
            {selectedCurrencyTo ? (
              <>
                <img
                  className="w-6 h-6 rounded-full mr-2"
                  src={selectedCurrencyTo.flag}
                  alt={`${selectedCurrencyTo.name} flag`}
                />
                <span>
                  {selectedCurrencyTo.code} - {selectedCurrencyTo.name}
                </span>
              </>
            ) : (
              "Select Currency"
            )}
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          {openDropdownTo && (
            <ul className="absolute z-10 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto mt-2 w-full">
              {currencies.map((currency, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedCurrencyTo(currency);
                    setOpenDropdownTo(false);
                  }}
                >
                  <img
                    className="w-6 h-6 rounded-full mr-2"
                    src={currency.flag}
                    alt={`${currency.name} flag`}
                  />
                  <span>
                    {currency.code} - {currency.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full">
        <label className="text-gray-600 font-semibold mb-1 block">Amount</label>
        <input
          type="number"
          value={inputAmount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="border rounded-lg p-3 w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300"
        />
      </div>

      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full"
      >
        Convert
      </button>

      {convertedAmount && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg w-full text-center">
          <p className="text-xl font-semibold">
            {convertedAmount} {selectedCurrencyTo?.code}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
