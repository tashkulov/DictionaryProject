import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Main.css';

const Main = () => {
    const [englishWord, setEnglishWord] = useState('');
    const [russianWord, setRussianWord] = useState('');
    const [words, setWords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedWords = localStorage.getItem('words');
        if (storedWords) {
            setWords(JSON.parse(storedWords));
        }
    }, []);

    const handleAddWord = () => {
        if (englishWord && russianWord) {
            const newWord = { english: englishWord, russian: russianWord };
            setWords((prevWords) => [...prevWords, newWord]);
            localStorage.setItem('words', JSON.stringify([...words, newWord]));
            setEnglishWord('');
            setRussianWord('');
            toast.success('Word added successfully!', { autoClose: 2000 });
        } else {
            toast.error('Please enter both English and Russian words.');
        }
    };

    const handleStartTest = () => {
        if (words.length > 0) {
            navigate('/start', { state: { words } });
        } else {
            toast.warning('Add words before starting the test.');
        }
    };

    const handleClearAllWords = () => {
        setWords([]);
        localStorage.removeItem('words');
        toast.info('Word added!', { autoClose: 2000 });
    };

    return (
        <div className="form">
            <div className="title">Welcome</div>
            <div className="subtitle">Let's start learning English!</div>
            <div className="input-container ic1">
                <input
                    id="firstname"
                    className="input"
                    type="text"
                    placeholder=" "
                    value={englishWord}
                    onChange={(e) => setEnglishWord(e.target.value)}
                />
                <div className="cut"></div>
                <label htmlFor="firstname" className="placeholder">English word</label>
            </div>
            <div className="input-container ic2">
                <input
                    id="lastname"
                    className="input"
                    type="text"
                    placeholder=" "
                    value={russianWord}
                    onChange={(e) => setRussianWord(e.target.value)}
                />
                <div className="cut"></div>
                <label htmlFor="lastname" className="placeholder">Russian word</label>
            </div>

            <button type="text" className="submit" onClick={handleAddWord}>add</button>
            <button type="text" className="submit" onClick={handleStartTest}>start</button>
            <button type="text" className="submit" onClick={handleClearAllWords}>Clear All Words</button>

            <ToastContainer position="bottom-center" />
        </div>
    );
};

export default Main;
