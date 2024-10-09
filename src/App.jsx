import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
import './index.css'; // Import your main CSS file

function App() {
  return (
    <div className="App">
      <div className="layout">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
