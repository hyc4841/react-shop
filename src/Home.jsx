import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to My Website</h1>
            <Link to="/login">
                <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to Login</button>
            </Link>
        </div>
    );
};

export default Home;
