import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Clear Paths</h1>
      </header>
      <main>
        {/* Add components for Natural Language Deal Analyzer */}
        <DealAnalyzer />
        {/* Add components for AI Pitch Generator */}
        <AIPitchGenerator />
      </main>
    </div>
  );
}

export default App;