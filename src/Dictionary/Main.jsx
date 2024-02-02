import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import "./Main.css"
const Main = () => {
    const [englishWord, setEnglishWord] = useState('');
    const [russianWord, setRussianWord] = useState('');
    const [words, setWords] = useState([]);
    const navigate = useNavigate();

    const handleAddWord = () => {
        if (englishWord && russianWord) {
            const newWord = { english: englishWord, russian: russianWord };
            setWords((prevWords) => [...prevWords, newWord]);
            setEnglishWord('');
            setRussianWord('');
        }
    };

    const handleStartTest = () => {
        if (words.length > 0) {
            navigate('/start',{state:{words}});
        } else {
            alert('Добавьте слова перед началом теста.');
        }
    };

    return (


        <div className="form">
            <div className="title">Welcome</div>
            <div className="subtitle">Let's start learn english!</div>
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
                <label form="firstname" className="placeholder">English word</label>
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
                <label form="lastname" className="placeholder">Russian word</label>
            </div>

            <button type="text" className="submit" onClick={handleAddWord}>add</button>
            <button type="text" className="submit" onClick={handleStartTest}>start</button>




        </div>


    )
        ;
};

export default Main;
