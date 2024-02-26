import './App.css';
import { useState } from 'react'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function App() {
  let [city, setcity] = useState("")
  let [weatherDetails, setweatherDetails] = useState()
  let getData = (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=20233ce6ed7653e5d77f80f60952f68f&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if(result.cod=='404'){
          setweatherDetails()
        }else{
          setweatherDetails(result)
        }
      })
    event.preventDefault();
    setcity('')
  }
  return (
    <>
        <h1 className='title'>Simple Weather App</h1>
    <div className="box">
      <form id="srch" onSubmit={getData} className="search">
        <input placeholder='city name' className="search-input" type="text" value={city} onChange={(e) => setcity(e.target.value)} />
        <button className='search-btn'><FontAwesomeIcon icon={faSearch} className="text-warning" /></button>
      </form>


      <div className="output">

        {weatherDetails !== undefined ?
          <>
            <h3>{weatherDetails.name} <span>{weatherDetails.sys.country}</span> </h3>
            {/* <h2>{Temp}</h2> */}
            <h2>{weatherDetails.main.temp} <sup>0</sup>C</h2>
            <img src = {`https://api.openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`} alt="" />
            <p>{weatherDetails.weather[0].description}</p>
          </>
            :
            'No City Data Found'
        }
      </div>

    </div>

    <div className="foot">
      &copy;predator
    </div>

      </>
  );
}

export default App;
