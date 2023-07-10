import React, { FC } from 'react';
import { Button, DatePicker, TimePicker } from 'antd';
import './App.css';
import DateTimeToggle from './components/DateTimeToggle';

const App: FC = () => {
  return (
    <div className="App">
      <Button type='primary'>Button</Button>
      <DatePicker showTime={true}></DatePicker>
      <DateTimeToggle></DateTimeToggle>
    </div>
  );
}

export default App;
