import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext(null);

export const RATES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 155.0 }
};

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(
    localStorage.getItem('creatorhub_currency') || 'USD'
  );

  const setCurrency = (code) => {
    if (RATES[code]) {
      setSelectedCurrency(code);
      localStorage.setItem('creatorhub_currency', code);
    }
  };

  const formatPrice = (amountInUSD) => {
    if (amountInUSD === undefined || amountInUSD === null) return '$0';
    const curr = RATES[selectedCurrency] || RATES.USD;
    const converted = Math.round(Number(amountInUSD) * curr.rate);
    
    if (curr.code === 'JPY') {
      return `${curr.symbol}${converted.toLocaleString()}`;
    }
    if (curr.code === 'INR') {
      return `${curr.symbol}${converted.toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setCurrency, formatPrice, RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
