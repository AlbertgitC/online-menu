import React from 'react';
import './App.css';
import { AuthState } from './components/util/global-store';
import Main from './components/main';

function App() {
    return (
        <AuthState>
            <Main/>
        </AuthState>
    );
}

export default App;
