import React from 'react';
import logo from './logo.svg';
import TabindexLoop from 'react-tabindex-loop';
import ExampleElements from './ExampleElements';
import './App.css';

function App() {
  return (
    <div className='App'>
      <TabindexLoop>
        <ExampleElements/>
      </TabindexLoop>
    </div>
  );
}

export default App;
