import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Component/Home';
import Available from './Component/Available';
import TrainDetails from './Component/TrainDetails';
import Booking from './Component/Booking';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/available" element={<Available />}/>
            <Route path="/train/:id" element={<TrainDetails />}/>
            <Route path="/booking" element={<Booking />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
