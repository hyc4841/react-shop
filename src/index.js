import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TestAPI from './test';
import LandingPage from './example/conditional rendering/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <TestAPI />
    </React.StrictMode>
);