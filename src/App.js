import React from 'react';
import './App.css';
import StoreList from './components/list-stores';
import StoreForm from './components/store-form';
import Header from './components/header';
import SignUp from './components/signup-form';

function App() {

  return (
    <div className="App">
      <Header />
      <SignUp />
      <StoreForm />
      <StoreList />
    </div>
  );
}

export default App;
