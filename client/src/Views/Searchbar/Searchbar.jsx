import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRazas } from '../../redux/Actions/Actions';
import "./Searchbar.css";
import { validateSearchText } from './search';

const Searchbar = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    const isValid = validateSearchText(searchText);
    if (isValid) {
      dispatch(getRazas(searchText));
      window.location.href = `/search?name=${searchText}`;
    } else {
      alert('Ingresa al menos 3 caracteres y no solo espacios en blanco.');
    }
  };




  return (
    <div className="button-container">
      <Link to="/home">
        <button className="buttonsearch">Home</button>
      </Link>
      <div className="InputContainer">
        <input
          type="text"
          name="text"
          className="input"
          id="input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>
          <label htmlFor="input" className="labelforsearch">
            <svg viewBox="0 0 512 512" className="searchIcon" style={{ cursor: "pointer" }}>
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </label>
        </button>
        <div className="border"></div>
      </div>
      <Link to="/form">
        <button className="buttonsearch">
          Crea tu perro!
        </button>
      </Link>
    </div>
  );
};

export default Searchbar;

