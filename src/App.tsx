import React from 'react';
import logo from './cute_dog.png';
import { Table } from './features/table/Table';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  selectTable1,
  selectTable2
} from './features/table/tableSlice';
import { useAppSelector } from './app/hooks';



function App() {
  const table1 = useAppSelector(selectTable1);
  const table2 = useAppSelector(selectTable2);
  
  const downloadObjectAsJson = (exportObj : object, fileName : string) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", fileName + ".json");
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const handleDownloadButton = () => {
    const jsonData : Record<string, any> = {
        "dogBreeds": {
            "breed1Total": table1.length,
            "breed1Rank": {},
            "breed2Total": table2.length,
            "breed2Rank": {}
        }
    }

    for(let i=0; i<table1.length; i++){
      const rankNum = i + 1;
      const newRank = "rank" + rankNum;
      const newBreed = table1[i].breed;
      jsonData.dogBreeds.breed1Rank[newRank] = newBreed;
    }

    for(let i=0; i<table2.length; i++){
      const rankNum = i + 1;
      const newRank = "rank" + rankNum;
      const newBreed = table2[i].breed;
      jsonData.dogBreeds.breed2Rank[newRank] = newBreed;
    }

    downloadObjectAsJson(jsonData, "breedTables")
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Table />
        <button className="download-button" onClick={() => handleDownloadButton()}><span className='button-text'>Download</span></button>
      </header>
    </div>
  );
}

export default App;
