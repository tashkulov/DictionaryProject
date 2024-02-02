import React from 'react';
import './App.css';




import Main from "./Dictionary/Main";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from "./Dictionary/Start/Start";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/start" element={<Start />} />
            </Routes>
        </Router>
    );
}

export default App;

