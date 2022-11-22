import React, {useState, useEffect} from "react";
import './Capitais.css'

const cidades = [
    ["Aracaju", "Sergipe"],
    ["Belo Horizonte", "Minas Gerais"],
    ["Belém", "Pará"],
    ["Brasília", "Distrito Federal"],
    ["Boa Vista", "Roraima"],
    ["Campo Grande", "Mato Grosso do Sul"],
    ["Cuiabá", "Mato Grosso"],
    ["Curitiba", "Paraná"],
    ["Florianópolis", "Santa Catarina"],
    ["Fortaleza", "Ceará"],
    ["Goiânia", "Goiás"],
    ["João Pessoa", "Paraíba"],
    ["Manaus", "Amazonas"],
    ["Maceió", "Alagoas"],
    ["Macapá", "Amapá"],
    ["Natal", "Rio Grande do Norte"],
    ["Palmas", "Tocantins"],
    ["Porto Velho", "Rondônia"],
    ["Porto Alegre", "Rio Grande do Sul"],
    ["Recife", "Pernambuco"],
    ["Rio Branco", "Acre"],
    ["Rio de Janeiro", "Rio de Janeiro"],
    ["São Paulo", "São Paulo"],
    ["Salvador", "Bahia"],
    ["São Luís", "Maranhão"],
    ["Teresina", "Piauí"],
    ["Vitória", "Espirito Santo"]
  ];


function Automatico(min, max){

    min = Math.ceil(min);
    max = Math.floor(max);  
    return Math.floor(Math.random() * (max - min) + min);      
}

const Capitais = () => {
    const [capitais, setCapitais] = useState("");
    const [show, setShow] = useState(false);
    const KEY_ID = '736a09872c790ec3d1e8688f80005208';
  
    const GetWeather = () => {
      const url =(`https://api.openweathermap.org/data/2.5/weather?q=${cidades[Automatico(0, 15)][0]},bra&appid=${KEY_ID}&units=metric&lang=pt`)
        fetch(url)
        .then(res => res.json())
        .then(data => {
          const { main, name} = data;
            setCapitais(
              `<div>
                  <h3>${name}</h3>
                  <h1>${Math.round(main.temp)} °C</h1>
              </div>`
            );
          })
    }
  
    useEffect(() => {

      const intervalo = setInterval(() => {

        if (show) {
          GetWeather();
        }
      }, 2000);
      return () => clearInterval(intervalo);
    })
  
    return (
      
      <div>
          <div>
              <button onClick={() => setShow(true)} >Start</button>
              {
              (capitais.cod !== "404") ?
              <div className="glass-effect-capitais" >
                <div className="text" dangerouslySetInnerHTML={{ __html: capitais }} />
              </div>: ""
            }
          </div>
      </div>
    );
  }
  
  export default Capitais;

        

