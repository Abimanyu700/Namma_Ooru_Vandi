import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CssPage/TrainDetails.css";

const TrainDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const train = location.state?.train;

  if (!train) {
    return <h2>No Train Selected</h2>;
  }

  const totalSeats = 120;
  const bookedSeatsKey = `bookedSeats_${train.name}`;

  const predefinedBookedSeats = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 
                                 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 103, 107, 109, 115, 118];

  const storedBookedSeats = JSON.parse(localStorage.getItem(bookedSeatsKey)) || predefinedBookedSeats;

  useEffect(() => {
    if (!localStorage.getItem(bookedSeatsKey)) {
      localStorage.setItem(bookedSeatsKey, JSON.stringify(predefinedBookedSeats));
    }
  }, [train.name]);

  const [bookedSeats, setBookedSeats] = useState(storedBookedSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleProceedToBooking = () => {
    if (selectedSeats.length === 0) return;
    
    const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
    setBookedSeats(updatedBookedSeats);
    localStorage.setItem(bookedSeatsKey, JSON.stringify(updatedBookedSeats));

    navigate("/booking", { state: { train, selectedSeats, date: new Date().toLocaleDateString() } });
  };

  return (
    <div className="train-details-container">
      <div className="train-details">
        <h2>{train.name}</h2>
        <p><strong>From:</strong> {train.from} → <strong>To:</strong> {train.to}</p>
        <p><strong>Available Classes:</strong> {train.classes.join(", ")}</p>
        <p><strong>Price:</strong> ₹{train.price}</p>
        <p><strong>Start Time:</strong> {train.startTime} - <strong>End Time:</strong> {train.endTime}</p>
        <p><strong>Distance:</strong> {train.distance}</p>
      </div>

      <div className="seat-layout">
        <h3>Select Your Seats</h3>
        <div className="coach-container">
          {[...Array(totalSeats / 6)].map((_, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {renderSeat(rowIndex * 6 + 1, "Window", bookedSeats, selectedSeats, handleSeatClick)}
              {renderSeat(rowIndex * 6 + 2, "Middle", bookedSeats, selectedSeats, handleSeatClick)}
              {renderSeat(rowIndex * 6 + 3, "Aisle", bookedSeats, selectedSeats, handleSeatClick)}
              <div className="aisle"></div>
              {renderSeat(rowIndex * 6 + 4, "Aisle", bookedSeats, selectedSeats, handleSeatClick)}
              {renderSeat(rowIndex * 6 + 5, "Middle", bookedSeats, selectedSeats, handleSeatClick)}
              {renderSeat(rowIndex * 6 + 6, "Window", bookedSeats, selectedSeats, handleSeatClick)}
            </div>
          ))}
        </div>
      </div>

      <button
        className="proceed-button"
        disabled={selectedSeats.length === 0}
        onClick={handleProceedToBooking}
      >
        Proceed to Booking
      </button>
    </div>
  );
};

const renderSeat = (seatNumber, seatType, bookedSeats, selectedSeats, handleSeatClick) => {
  const isBooked = bookedSeats.includes(seatNumber);
  const isSelected = selectedSeats.includes(seatNumber);
  
  return (
    <div
      key={seatNumber}
      className={`seat ${isBooked ? "booked" : "available"} ${isSelected ? "selected" : ""}`}
      onClick={() => handleSeatClick(seatNumber)}
    >
      {seatNumber} <br /> ({seatType})
    </div>
  );
};

export default TrainDetails;
