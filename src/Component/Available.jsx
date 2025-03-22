import React, { useState, useEffect } from "react";
import trainData from "../Data/trainData";
import "../CssPage/Available.css";
import { useNavigate } from "react-router-dom";

const Available = () => {
  const [search, setSearch] = useState("");
  const [filteredTrains, setFilteredTrains] = useState(trainData);
  const navigate = useNavigate();

  const getAvailableSeats = (train) => {
    const totalSeats = 120;
    const bookedSeatsKey = `bookedSeats_${train.id}`;
    const bookedSeats = JSON.parse(localStorage.getItem(bookedSeatsKey)) || Array(25).fill().map((_, i) => i + 1);
    return totalSeats - bookedSeats.length; 
  };

  useEffect(() => {
    setFilteredTrains(trainData.map(train => ({
      ...train,
      availableSeats: getAvailableSeats(train),
    })));
  }, []);

  const handleTrainClick = (train) => {
    navigate(`/train/${train.id}`, { state: { train } });
  };

  const handleSearch = () => {
    const results = trainData.filter((train) =>
      train.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTrains(results);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="available-container">
      <h2>Available Trains</h2>
      <input
        type="text"
        placeholder="Search by Train Name..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      <ul>
        {filteredTrains.map((train) => (
          <li key={train.id} className="train-item" onClick={() => handleTrainClick(train)}>
            <h3>{train.name}</h3>
            <p>From: {train.from} → To: {train.to}</p>
            <p>Classes: {train.classes.join(", ")}</p>
            <p>Seats Available: {getAvailableSeats(train)}</p>
            <p>Price: ₹{train.price}</p>
            <button onClick={() => handleTrainClick(train)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Available;
