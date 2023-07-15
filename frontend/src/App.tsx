import { FC, useEffect, useState } from 'react';
import './App.css';
import WebLayout from './layouts/WebLayout';
import { APIConfig } from './data/APIConfig';
import MainContext from './context/MainContext';
import MediaQuery from 'react-responsive';
import MobileLayout from './layouts/MobileLayout';

const App: FC = () => {
  APIConfig.configureOpenAPI()
  return (
    <div className="App">
      <MainContext>
        <MediaQuery minWidth={1000}>
          <WebLayout></WebLayout>
        </MediaQuery>
        <MediaQuery maxWidth={999}>
          <MobileLayout></MobileLayout>
        </MediaQuery>
      </MainContext>
    </div>
  );
}

export default App;
