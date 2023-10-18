import React from 'react';
import { useLocation } from 'react-router-dom';

const SecondPage = () => {
  // const { location } = props;
  const location = useLocation();
  // const { state } = location;
  // console.log(state);
  const {
    eventName,
    typeOfEvent,
    eventDescription,
    startSaleDate,
    endSaleDate,
  } = location.state;
  
  return (
    <div>
      <h1>Thông tin sự kiện</h1>
      <p>Tên sự kiện: {eventName}</p>
      <p>Loại sự kiện: {typeOfEvent}</p>
      <p>Mô tả sự kiện: {eventDescription}</p>
      <p>Ngày bắt đầu bán vé: {startSaleDate}</p>
      <p>Ngày kết thúc bán vé: {endSaleDate}</p>
    </div>
  );
};

export default SecondPage;
