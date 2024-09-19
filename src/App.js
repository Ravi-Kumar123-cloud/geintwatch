import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [isStart, setisStart  ] = useState(false);
  const [isPause, setisPause  ] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);
  
   const  handleStart = () =>{
    if(hours<0 || minutes<0 ||seconds<=0){
      alert('invalid input')
      return;
    }
    else{

      setisStart(true);
     
    }
   }
      
   const handleResume=()=>{
    setisPause(true)
    runTimer(seconds,minutes,hours)
    
   }
   const handlepause = ()=>{
      setisPause(true)
      clearInterval(timerId)
   }


   const handleReset= ()=>{
    setisStart(false)
    ResetTimer()
   }
   const ResetTimer = ()=>{
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    clearInterval(timerId);
   }
   const handleInput = (e)=>{
    console.log(e.target.id, e.target.value);
    const value =parseInt(e.target.value)
    const id = e.target.id;
    if(id==='hours')
    {
      setHours(value)
    } 
    else if(id==='minutes')
    {
      setMinutes(value)
    } if(id==='seconds')
    {
      setSeconds(value)
    }

   }
   const runTimer = (sec, min, hr, tid)=>{
    if(sec>0){
      setSeconds((s)=> s - 1);
    }else if(sec===0 && min > 0)
    {
      setMinutes((m) => m - 1);
      setSeconds(59);
    }
    else if(min===0) {
      setHours((h)=> h-1);
      setMinutes(59);
      setSeconds(59);
    }
    if(sec===0 && min===0 && hr===0)
    {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      clearInterval(tid)
      alert('timer is finished');
    }

   }
   useEffect(()=>{
     let tid;
     if(isStart){
       tid = setInterval(()=>{
         runTimer(seconds, minutes, hours, tid) ; 
      },1000)
      setTimerId(tid)
    }
    
    return ()=>{
      clearInterval(tid)
    }
    
  },[isStart, hours, minutes, seconds ])
  console.log(hours, minutes, seconds);

  return (
    <div className="App">
     <h1>Countdown Timer</h1>
   
   {
    !isStart && (<div className=" input-cantainer">
      <div className="input-box">
       <input onChange={handleInput} id="hours" placeholder="HH" />
       <input onChange={handleInput} id="minutes" placeholder="mm" />
       <input onChange={handleInput} id="seconds" placeholder="ss" />
      </div>
      <button 
      onClick={handleStart}
      className='timer-button'>Start</button>
     </div>)
     }
     {
      isStart &&(<div className="show-container">
      <div className="timer-box">
        <div>{hours <10 ?`0${hours}` : hours }</div>
        <span>:</span> 
        <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
        <span>:</span> 
        <div>{seconds <10 ? `0${seconds}` : seconds}</div>
      </div>
      <div className="action-box">
        {
          !isPause &&
          <button onClick={handlepause} className="timer-button">Pause</button>
        }
        {
          isPause &&
          <button onClick={handleResume} className="timer-button">Resume</button>
        }
        
        
          <button onClick={handleReset}  className="timer-button">Reset</button>
        
      </div>
     </div>
    )}
    </div>
  );
}

export default App;

// import { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [isStart, setIsStart] = useState(false);
//   const [isPause, setIsPause] = useState(false);
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [timerId, setTimerId] = useState(null);

//   const handleStart = () => {
//     if (hours < 0 || minutes < 0 || seconds < 0) {
//       alert('Invalid input');
//       return;
//     }
//     setIsStart(true);
//     setIsPause(false);
//     runTimer();
//   };

//   const handlePause = () => {
//     setIsPause(true);
//     clearInterval(timerId);
//   };

//   const handleResume = () => {
//     setIsPause(false);
//     runTimer();
//   };

//   const handleReset = () => {
//     setIsStart(false);
//     ResetTimer();
//   };

//   const ResetTimer = () => {
//     setHours(0);
//     setMinutes(0);
//     setSeconds(0);
//     clearInterval(timerId);
//   };

//   const handleInput = (e) => {
//     const value = parseInt(e.target.value) || 0; // Default to 0 if NaN
//     const id = e.target.id;
//     if (id === 'hours') {
//       setHours(value);
//     } else if (id === 'minutes') {
//       setMinutes(value);
//     } else if (id === 'seconds') {
//       setSeconds(value);
//     }
//   };

//   const runTimer = () => {
//     const tid = setInterval(() => {
//       setSeconds((prevSeconds) => {
//         if (prevSeconds > 0) {
//           return prevSeconds - 1;
//         } else if (minutes > 0) {
//           setMinutes((prevMinutes) => prevMinutes - 1);
//           return 59;
//         } else if (hours > 0) {
//           setHours((prevHours) => prevHours - 1);
//           setMinutes(59);
//           return 59;
//         } else {
//           clearInterval(tid);
//           alert('Timer is finished');
//           ResetTimer();
//           return 0;
//         }
//       });
//     }, 1000);
    
//     setTimerId(tid);
//   };

//   useEffect(() => {
//     return () => clearInterval(timerId); // Clear interval on component unmount
//   }, [timerId]);

//   return (
//     <div className="App">
//       <h1>Countdown Timer</h1>
//       {!isStart && (
//         <div className="input-container">
//           <div className="input-box">
//             <input onChange={handleInput} id="hours" placeholder="HH" />
//             <input onChange={handleInput} id="minutes" placeholder="mm" />
//             <input onChange={handleInput} id="seconds" placeholder="ss" />
//           </div>
//           <button onClick={handleStart} className='timer-button'>Start</button>
//         </div>
//       )}
//       {isStart && (
//         <div className="show-container">
//           <div className="timer-box">
//             <div>{hours < 10 ? `0${hours}` : hours}</div>
//             <span>:</span>
//             <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
//             <span>:</span>
//             <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
//           </div>
//           <div className="action-box">
//             {!isPause ? (
//               <button onClick={handlePause} className="timer-button">Pause</button>
//             ) : (
//               <button onClick={handleResume} className="timer-button">Resume</button>
//             )}
//             <button onClick={handleReset} className="timer-button">Reset</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

