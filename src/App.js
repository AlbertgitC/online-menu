import React from 'react';
import './App.css';
import StoreList from './components/list-stores';
import StoreForm from './components/store-form';
import Header from './components/header';
import { SignupForm } from './components/signup-form';

function App() {

  return (
    <div className="App">
      <Header />
      <SignupForm />
      <StoreForm />
      <StoreList />
    </div>
  );
}

export default App;
