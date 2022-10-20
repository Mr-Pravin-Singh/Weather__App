
import React, { useState } from 'react'
import axios from 'axios'
import ShowTemp from './ShowTemp'

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({
        description:"",
    
        feels_like: 0,
        temp_max: 0,
        temp_min: 0,  
        humidity: 0,
        sunrise: 0,
        sunset: 0,
        country:"",
        speed: 0,
      
  });



  const handleClick = ()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=69a6e546b9746840605e63c55be7ea0f`)
    .then((response)=>{
      console.log(response.data.sys.sunrise) 
     

      setData({
        description: response.data.weather[0].description,
        feels_like: ((response.data.main.feels_like)- 273.15).toFixed(2),
        
        temp_max: ((response.data.main.temp_max)-273.15).toFixed(2),
        temp_min: ((response.data.main.temp_min) -273.15).toFixed(2),
        humidity: response.data.main.humidity,
        sunrise: getTime(response.data.sys.sunrise),
        sunset: getTime(response.data.sys.sunset),
        country: response.data.sys.country,
        speed: response.data.wind.speed,
        
      })
    })
      .catch((error)=>{
      console.log(error);
    })
    
  }

  const getTime = (stamp)=>{
    const date = new Date(stamp*1000);
    return date.toTimeString();
  }


  return (
    <>
        <div className='container text-center my-2'>
          <h1 className='whitee'>Weather App</h1>
          <input type="text" className='form' value={city} onChange={(el)=>{
            setCity(el.target.value)
          }} />
          {/* <input type="text" className='form-control' /> */}
          <button className='btn btn-primary mx-2' type='submit' onClick={handleClick}>Get temp</button>

          
        </div>
        <ShowTemp text={data}></ShowTemp>
      </>
  )
}

export default App

