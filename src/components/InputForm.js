import React, { useState } from 'react';
import axios from 'axios';

function InputForm() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('https://your-backend-url.herokuapp.com/bfhl', parsedInput); // Replace with your backend URL
            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Invalid JSON or network error');
        }
    };

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions(prev =>
            checked ? [...prev, value] : prev.filter(option => option !== value)
        );
    };

    const renderResponse = () => {
        if (!response) return null;

        const displayData = {};
        if (selectedOptions.includes('Alphabets')) displayData.alphabets = response.alphabets;
        if (selectedOptions.includes('Numbers')) displayData.numbers = response.numbers;
        if (selectedOptions.includes('Highest lowercase alphabet')) displayData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

        return (
            <div>
                <h3>Response:</h3>
                <pre>{JSON.stringify(displayData, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
                rows="4"
                cols="50"
            ></textarea>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <label>
                <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
                Alphabets
            </label>
            <label>
                <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
                Numbers
            </label>
            <label>
                <input type="checkbox" value="Highest lowercase alphabet" onChange={handleOptionChange} />
                Highest lowercase alphabet
            </label>
            {renderResponse()}
        </div>
    );
}

export default InputForm;
