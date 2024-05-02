'use client';

import axios from 'axios';
import React, { useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './DataTable.css';

export default function DataTable() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const SYMBOLS = ['SPX', 'NDAQ', 'DJIA'];

    const fetchData = async () => {
      await axios
        .get(`/api/yahoo-finance/search?symbols=${SYMBOLS.join(',')}`)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const itemsJSX = data.map((entry, idx) => {
    // const { open, close, symbol, date, volume } = entry;
    // const currentValue = close; // Assuming 'close' is the current (realtime) value
    // const openingValue = open;
    console.log(entry);
    const currentValue = entry.regularMarketPrice;
    const openingValue = entry.regularMarketOpen;
    const symbol = entry.symbol;
    const volume = entry.regularMarketVolume;

    const indicator =
      currentValue - openingValue >= 0 ? 'Positive' : 'Negative';

    const arrowIcon =
      indicator === 'Positive' ? (
        <ArrowUpwardIcon style={{ color: 'white' }} />
      ) : (
        <ArrowDownwardIcon style={{ color: 'white' }} />
      );

    return (
      <Item
        key={idx}
        symbol={symbol}
        currentValue={currentValue}
        volume={volume}
        arrowIcon={arrowIcon}
        indicator={indicator}
      />
    );
  });

  return <div className="DataTable__container">{itemsJSX}</div>;
}

const Item = ({ symbol, currentValue, volume, arrowIcon, indicator }) => (
  <div className="DataTable__row">
    <div className="DataTable__row__item symbol">{symbol}</div>
    {/* <div className="DataTable__row__item">{date}</div> */}
    <div className="DataTable__row__item">
      {indicator === 'Positive' ? '+' : '-'}
      {currentValue}&nbsp;&nbsp;
      {arrowIcon}
    </div>
    <div>{volume?.toLocaleString?.() ?? 0}</div>
  </div>
);
