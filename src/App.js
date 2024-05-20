import React, { useState, useRef } from 'react';
import axios from 'axios';

const App = () => {
  // State hook to store the input name
  const [name, setName] = useState('');
  // State hook to store the predicted nationality
  const [nationality, setNationality] = useState(null);
  // Ref hook to reference the input field for autofocus
  const inputRef = useRef(null);

  // Function to fetch nationality data from the API
  const fetchNationality = async () => {
    try {
      // Make a GET request to the nationalize.io API with the input name
      const response = await axios.get(`https://api.nationalize.io?name=${name}`);
      // Extract the first country data from the response
      const countryData = response.data.country[0];
      // Set the nationality state with the country ID and probability
      setNationality(countryData ? `${countryData.country_id} (${countryData.probability * 100}%)` : 'Not found');
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error fetching the nationality data', error);
      setNationality('Error fetching data');
    }
  };

  // Event handler to update the name state when the input field changes
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  // Event handler to fetch nationality data and refocus the input field
  const handleButtonClick = () => {
    fetchNationality();
    inputRef.current.focus();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Nationality Predictor</h1>
              {/* Input field for entering a name, with autofocus and change handler */}
              <div className="form-group">
                <input
                  type="text"
                  ref={inputRef}
                  value={name}
                  onChange={handleInputChange}
                  placeholder="Enter a name"
                  className="form-control"
                />
              </div>
              
              <div className="d-flex justify-content-center mt-3">
                <button onClick={handleButtonClick} className="btn btn-primary w-100" >
                  Predict
                </button>
              </div>
              {/* Display the predicted nationality if available */}
              {nationality && (
                <div className="alert alert-info mt-4" role="alert">
                  <strong>Nationality:</strong> {nationality}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
