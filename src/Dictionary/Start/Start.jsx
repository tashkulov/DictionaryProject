import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Start.css';

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const Start = () => {
    const location = useLocation();
    const initialWords = location.state ? location.state.words : [];
    const [words, setWords] = useState(() => {
        const storedWords = localStorage.getItem('words');
        const initialWordsArray = storedWords ? JSON.parse(storedWords) : initialWords;
        return shuffleArray(initialWordsArray);
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words));
    }, [words]);

    useEffect(() => {
        setWords(shuffleArray(initialWords));
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [initialWords]);

    const handleNextWord = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1 < words.length ? prevIndex + 1 : 0));
        setIsFlipped(false);
    };

    const handleShowTranslation = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="wrap">
            {words.length > 0 && currentIndex < words.length && (
                <>
                    <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                        <p>
                            <div className="front"><strong>{words[currentIndex].english}</strong></div>
                            <div className="back"><strong>{words[currentIndex].russian}</strong></div>
                        </p>
                    </div>
                    <div className="button-container">
                        <button type="text" className="submit" onClick={handleNextWord}><strong>Next</strong></button>
                        <button type="text" className="submit" onClick={handleShowTranslation}><strong>Show</strong></button>
                        <button type="button" className="submit">
                            <Link to="/" style={{ textDecoration: "none", color: "wheat" }}>
                                <strong>To home</strong>
                            </Link>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Start;
