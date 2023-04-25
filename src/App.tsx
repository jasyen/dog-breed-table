import React from 'react';
import logo from './cute_dog.png';
import { Table } from './features/table/Table';
import { DownloadButton } from './components/downloadButton/DownloadButton';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Table />
        <DownloadButton />
      </header>
    </div>
  );
}

export default App;
