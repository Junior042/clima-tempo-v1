const cidade = document.querySelector('#cidade');
const img = document.querySelector('.img-icon');
const InfoDesc = document.querySelector('#info_desc');
const temp = document.querySelector('#temperatura');
const max_temp = document.querySelector('#max-temperatura');
const min_temp = document.querySelector('#min-temperatura');


const apiKey = '6054dce48a9074ef49fac01a21878063';
let data = {
  lat: '',
  lon: ''
}

// Pegando localização
getLocation()
function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else{
   console.log("O seu navegador não suporta Geolocalização.");
  }
}

function showPosition(position){
  data.lat = position.coords.latitude;
  data.lon = position.coords.longitude;
  busca(data);
}

function busca(dados){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${dados.lat.toString()}&lon=${dados.lon.toString()}&lang=pt&units=metric&appid=${apiKey}`)
  .then((res) => res.json()
  .then((res2) => render(res2)));
}

function render(dados){
  newTime()
  cidade.innerText = `| ${dados.name}`;
  console.log(dados);
  let id_icon = dados.weather[0].icon;
  let infoDesc = dados.weather[0].description;

  
  InfoDesc.innerText = infoDesc;
  temp.innerText = `${dados.main.temp}º`;
  img.innerHTML = `<img src="https://openweathermap.org/img/wn/${id_icon}@2x.png" alt="icon tempo" >`;
}

// =============================================================================

function newTime(){
  setInterval( function () {
    let hr = new Date() 
    let hora = hr.getHours();
    let minutes = hr.getMinutes(); 
    if(hora == 14 && minutes >= 45){
      const newFundo = document.querySelector('#fundo');
      newFundo.innerHTML = ' <img class="fundo" src="https://wallpapercave.com/wp/wp3846558.jpg" alt="">';
    }
  }, 10);
}

