import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Start.css';

const Start = () => {
    const location = useLocation();
    const words = location.state ? location.state.words : [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

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
                        <button type="text" className="submit" onClick={handleNextWord}>Следующее слово</button>
                        <button type="text" className="submit" onClick={handleShowTranslation}>Показать перевод</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Start;
