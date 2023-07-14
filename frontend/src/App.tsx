import { FC, useEffect, useState } from 'react';
import './App.css';
import WebLayout from './layouts/WebLayout';
import { APIConfig } from './data/APIConfig';
import MainContext from './context/MainContext';

const App: FC = () => {
  APIConfig.configureOpenAPI()
  return (
    <div className="App">
      <MainContext>
        <WebLayout></WebLayout>
      </MainContext>
    </div>
  );
}

export default App;
