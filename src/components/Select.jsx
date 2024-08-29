import React, { useState, useEffect } from "react";
import DataJson from "../assets/country-currency.json";

const CurrencyConverter = () => {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState(null);
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [currencies, setCurrencies] = useState([]);
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
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-xl space-y-6 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6 animate-fadeInDown">
        Currency Converter
      </h1>

      <div className="flex items-center justify-between w-full space-x-4 animate-fadeInLeft">
        <div className="relative w-1/2">
          <label className="text-white font-semibold mb-2 block">From</label>
          <div
            className="border-2 border-white bg-white bg-opacity-20 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-opacity-30 transition duration-300"
            onClick={() => setOpenDropdownFrom(!openDropdownFrom)}
          >
            {selectedCurrencyFrom ? (
              <>
                <img
                  className="w-6 h-6 rounded-full mr-2"
                  src={selectedCurrencyFrom.flag}
                  alt={`${selectedCurrencyFrom.name} flag`}
                />
                <span className="text-white">
                  {selectedCurrencyFrom.code} - {selectedCurrencyFrom.name}
                </span>
              </>
            ) : (
              <span className="text-white">Select Currency</span>
            )}
            <i className="fa-solid fa-chevron-down text-white"></i>
          </div>
          {openDropdownFrom && (
            <ul className="absolute z-10 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto mt-2 w-full">
              {currencies.map((currency, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
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
          <label className="text-white font-semibold mb-2 block">To</label>
          <div
            className="border-2 border-white bg-white bg-opacity-20 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-opacity-30 transition duration-300"
            onClick={() => setOpenDropdownTo(!openDropdownTo)}
          >
            {selectedCurrencyTo ? (
              <>
                <img
                  className="w-6 h-6 rounded-full mr-2"
                  src={selectedCurrencyTo.flag}
                  alt={`${selectedCurrencyTo.name} flag`}
                />
                <span className="text-white">
                  {selectedCurrencyTo.code} - {selectedCurrencyTo.name}
                </span>
              </>
            ) : (
              <span className="text-white">Select Currency</span>
            )}
            <i className="fa-solid fa-chevron-down text-white"></i>
          </div>
          {openDropdownTo && (
            <ul className="absolute z-10 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto mt-2 w-full">
              {currencies.map((currency, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
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

      <div className="w-full animate-fadeInUp">
        <label className="text-white font-semibold mb-2 block">Amount</label>
        <input
          type="number"
          value={inputAmount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="border-2 border-white bg-white bg-opacity-20 text-white placeholder-white p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
        />
      </div>

      <button
        onClick={handleConvert}
        className="bg-white text-blue-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 w-full animate-fadeInUp"
      >
        Convert
      </button>

      {convertedAmount && (
        <div className="mt-4 p-4 bg-white bg-opacity-30 text-white rounded-lg w-full text-center animate-fadeInUp">
          <p className="text-2xl font-semibold">
            {convertedAmount} {selectedCurrencyTo?.code}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
