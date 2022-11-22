import React, {useState, useEffect} from "react";
import './Capitais.css'
import cidades from "../../utils/ListaCapitais";
import CalculoAleatorio from "../../utils/CalculoAleatorio";


const Capitais = () => {
    const [capitais, setCapitais] = useState("");
    const KEY_ID = '736a09872c790ec3d1e8688f80005208';
  
    const GetCapital = () => {
      const url =(`https://api.openweathermap.org/data/2.5/weather?q=${cidades[CalculoAleatorio(0, 15)][0]},bra&appid=${KEY_ID}&units=metric&lang=pt`)
        fetch(url)
        .then((response) => response.json())
            .then((data) => {
                setCapitais(data);
            });
    }
  
    useEffect(() => {

      const intervalo = setInterval(() => {
          GetCapital();
      }, 2000);
      return () => clearInterval(intervalo);
    })
  
    return (
      
      <div>
          <div>
              {
              (capitais.cod !== "404") ?
              <div className="glass-effect-capitais" >
                    <div>
                        <p style={{fontSize: 22}}>{capitais.name}</p>
                        <h1 style={{fontSize: 35}}>{Math.round(capitais?.main?.temp)}°C</h1>
                    </div>
                
              </div>: ""
            }
          </div>
      </div>
    );
  }
  
  export default Capitais;

        

