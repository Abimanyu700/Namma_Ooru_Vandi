import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CssPage/Booking.css";

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { train, selectedSeats } = location.state || {};
    const currentDate = new Date().toLocaleDateString();

    if (!train || !selectedSeats) {
        return <h2>No Booking Details Available</h2>;
    }

    const totalPrice = train.price * selectedSeats.length; // Calculate total price

    return (
        <div className="booking-container">
            <h2>Ticket Confirmation</h2>
            <div className="ticket">
                <p><strong>Train Name:</strong> {train.name}</p>
                <p><strong>From:</strong> {train.from} → <strong>To:</strong> {train.to}</p>
                <p><strong>Distance:</strong> {train.distance}</p>
                <p><strong>Time:</strong> {train.startTime} - {train.endTime}</p>
                <p><strong>Price per Seat:</strong> ₹{train.price}</p>
                <p><strong>Number of Seats:</strong> {selectedSeats.length}</p>
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                <p><strong>Seat Numbers:</strong> {selectedSeats.join(", ")}</p>
                <p><strong>Date:</strong> {currentDate}</p>
            </div>
            <button className="return-button" onClick={() => navigate("/available")}>
                Return to Available Trains
            </button>
        </div>
    );
};

export default Booking;
