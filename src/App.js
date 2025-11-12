import React, { useState } from 'react';
import './App.css';
import Oracle from './components/Oracle';
import { answers, busyAnswers } from './components/Answers';

function App() {
  return (
    <div className="App">
      <Oracle answers={answers} busyAnswers={busyAnswers} />
    </div>
  );
}

export default App;
