import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await fetch('https://bajaj-backend-lobj.onrender.com/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedInput),
            });
            const data = await res.json();
            setResponse(data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input or server error.');
        }
    };

    const handleDropdownChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions(prev =>
            checked ? [...prev, value] : prev.filter(opt => opt !== value)
        );
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div>
                {selectedOptions.includes('Alphabets') && (
                    <div>Alphabets: {response.alphabets.join(', ')}</div>
                )}
                {selectedOptions.includes('Numbers') && (
                    <div>Numbers: {response.numbers.join(', ')}</div>
                )}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <div>Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(', ')}</div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>JSON Input</h1>
            <textarea
                rows="5"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            ></textarea>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {response && (
                <div>
                    <h2>Response</h2>
                    <label>
                        <input
                            type="checkbox"
                            value="Alphabets"
                            onChange={handleDropdownChange}
                        />
                        Alphabets
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Numbers"
                            onChange={handleDropdownChange}
                        />
                        Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Highest lowercase alphabet"
                            onChange={handleDropdownChange}
                        />
                        Highest lowercase alphabet
                    </label>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;
