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
        console.log(initialWords)
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [initialWords]);

    const getColor = (wordType) => {
        switch (wordType) {
            case 'Noun':
                return '#32c766';
            case 'Verb':
                return '#472FF7';
            case 'Adjective':
                return '#1dc9b4';
            default:
                return '#f48024';
        }
    };

    const handleNextWord = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1 < words.length ? prevIndex + 1 : 0));
        setIsFlipped(false);
    };

    const handleShowTranslation = () => {
        setIsFlipped(!isFlipped);
    };

    const handleSpeak = async () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(words[currentIndex].english);

            if (words[currentIndex].language === 'ru') {
                utterance.lang = 'ru-RU';
            } else {
                utterance.lang = 'en-US';
            }

            await new Promise((resolve) => {
                utterance.onend = resolve;
                speechSynthesis.speak(utterance);
            });
        } else {
            alert('Web Speech API не поддерживается в этом браузере.');
        }
    };

    return (
        <div className="wrap">
            <h2>Внимание!!!<br/>
                <span style={{color:'#32c766'}}>Существительные это зеленые!</span><br/>
                <span style={{color:'#472FF7'}}>Глаголы это фиолетовые!</span><br/>
                <span style={{color:'#1dc9b4'}}>Прилагательные это голубые!</span><br/>
                <span style={{color:'#f48024'}}>Остальные!</span><br/>
            </h2>


            {words.length > 0 && currentIndex < words.length && (
                <>
                    <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                        <p>
                            <div style={{ backgroundColor: getColor(words[currentIndex].type) }} className="front">
                                <strong>{words[currentIndex].english}</strong>
                            </div>
                            <div className="back">
                                <strong>{words[currentIndex].russian}</strong>
                            </div>
                        </p>
                    </div>
                    <div className="button-container">
                        <button type="text" className="submit" onClick={handleNextWord}>
                            <strong>Next</strong>
                        </button>
                        <button type="text" className="submit" onClick={handleShowTranslation}>
                            <strong>Show</strong>
                        </button>

                        <button type="button" className="submit">
                            <Link to="/" style={{ textDecoration: "none", color: "wheat" }}>
                                <strong>To home</strong>
                            </Link>
                        </button>
                        <button type="button" className="submit" onClick={handleSpeak}>
                            <strong>Speak</strong>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Start;
