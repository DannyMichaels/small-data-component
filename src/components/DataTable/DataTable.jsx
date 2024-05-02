import React, { useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './DataTable.css';
import { eodLatestMock } from '../../mocks/eodLatest.mock';
import { getEodLatest } from '../../services/marketstackApi';

export default function DataTable() {
  useEffect(() => {
    getEodLatest('AAPL,MSFT').then((data) => {
      console.log(data);
    });
  }, []);

  const itemsJSX = eodLatestMock.data.map((entry, idx) => {
    const { open, close, symbol, date, volume } = entry;
    const currentValue = close; // Assuming 'close' is the current (realtime) value
    const openingValue = open;
    const indicator =
      currentValue - openingValue >= 0 ? 'Positive' : 'Negative';

    const arrowIcon =
      indicator === 'Positive' ? (
        <ArrowUpwardIcon style={{ color: 'white' }} />
      ) : (
        <ArrowDownwardIcon style={{ color: 'white' }} />
      );

    return (
      <div key={idx} className="DataTable__row">
        <div className="DataTable__row__item">{symbol}</div>
        {/* <div className="DataTable__row__item">{date}</div> */}
        <div className="DataTable__row__item">
          {indicator === 'Positive' ? '+' : '-'}
          {currentValue}&nbsp;&nbsp;
          {arrowIcon}
        </div>
        <div>{volume.toLocaleString()}</div>
      </div>
    );
  });

  return <div className="DataTable__container">{itemsJSX}</div>;
}
