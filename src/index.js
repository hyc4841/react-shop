import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TestAPI from './test/test';
import LandingPage from './example/conditional rendering/LandingPage';
import Header from './component/ui/Header';
import Footer from './component/ui/Footer';
import { Provider } from 'react-redux';
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);