import React, {useState} from "react";
import Cloud from '@material-ui/icons/Cloud';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import OpacityIcon from '@material-ui/icons/Opacity';
import {RiWindyLine} from 'react-icons/ri'
import {BsThermometerHalf} from 'react-icons/bs'
import './SearchCidade.css'

export default function SearchCidade() {

  const [cidade, setCidade] = useState("");

  const GetWeather = (e) => {

      e.preventDefault()
      let cidadeValue = document.querySelector('input[name=NomeCidade]').value;
      let KEY_ID="736a09872c790ec3d1e8688f80005208"

      const url=(`https://api.openweathermap.org/data/2.5/weather?q=${cidadeValue},bra&appid=${KEY_ID}&units=metric&lang=pt`)
        fetch(url)
        .then(res => res.json())
        .then((data) => {
              setCidade(data);
        })
  }

  return (
    <div className="container">
      <div className="titulo">
          <h1><Cloud style={{ fontSize: 35 }}/> Previsão do Tempo</h1>
      </div>
          <form className="box-input" onSubmit={(e) =>GetWeather(e)}>
              <input
                  name="NomeCidade"
                  type="text" 
                  className="input-city"
                  placeholder="Digite a cidade" 
                  required
                    />
              <button className="button" >Buscar</button>
          </form>
          { cidade ?(
            <div className="glass-effect"> 
              <div className="container" style={{paddingLeft:30}}> 
                  <div className="container-name">
                    <div>
                      <h3 className="name"><LocationOnIcon style={{ fontSize: 18, marginTop:10 }}/> {cidade?.name}</h3>
                      <p style={{fontSize: 12, paddingLeft:5}}>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                      <p style={{fontSize: 14, paddingLeft:5}}> {cidade?.weather[0].description}</p>
                      <p style={{fontSize: 14, paddingLeft:5}}> Sensação Térmica: {Math.round(cidade?.main?.feels_like)}°C </p>
                    </div>
                    <div className="temp">
                        <img className="icon" src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${cidade.weather[0]["icon"]}.svg `} alt="icon" srcset="" />
                        <h1 style={{marginLeft:20, fontSize:50}}> {Math.round(cidade?.main?.temp)}°C</h1>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p style={{display:'flex'}}> <ArrowUpwardIcon /> {Math.round(cidade?.main?.temp_max)}°C | <ArrowDownwardIcon /> {Math.round(cidade?.main?.temp_min)}°C</p>
                    <p style={{display:'flex', marginLeft:30}}> <BsThermometerHalf /> {cidade?.main?.pressure} hPa </p>
                    <p style={{display:'flex', marginLeft:30}}> <OpacityIcon /> {cidade?.main?.humidity}% </p>
                    <p style={{display:'flex', marginLeft:30}}> <RiWindyLine/> {cidade?.wind?.speed} km/h </p> 
                  </div> 
              </div>
            </div>
              ): ""}
    </div>
  )
}