import React, { useState } from 'react'
import EngineImg from '../Images/engine.png';
import CoachImg from '../Images/box.jpg';
import '../CssPage/Home.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () =>{

  const [startAnimation, setStartAnimation] = useState(false);
  const navigate = useNavigate();

  const handleStart=()=>{
    setStartAnimation(true);
    setTimeout(() => {
      navigate('/available');
    }, 3000);
  }

  return (
    <>
        <div className='train-container'>
            <div className={`train ${startAnimation ? 'move-right' : ''}`}>
                  <img src = {EngineImg} className='engine'/>
                  <img src = {CoachImg} className='coach'/>
                  <img src = {CoachImg} className='coach'/>
            </div>
            {!startAnimation &&(
              <>
                  <h2 className="train-text">Namma Ooru Vandi</h2>
                  <button className='start-button' onClick={handleStart}>Book Ticket</button>
              </>
            )}
        </div>
    </>
  )
}

export default Home