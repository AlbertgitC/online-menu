import React from 'react';
import './App.css';
import StoreList from './components/list-stores';
import StoreForm from './components/store-form';

function App() {

  return (
    <div className="App">
      <StoreForm />
      <StoreList />
    </div>
  );
}

export default App;
