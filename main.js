const cidade = document.querySelector('#cidade');
const img = document.querySelector('.img-icon');
const InfoDesc = document.querySelector('#info_desc');
const temp = document.querySelector('#temperatura');
const max_temp = document.querySelector('#max-temperatura');
const min_temp = document.querySelector('#min-temperatura');
const apiKey = '6054dce48a9074ef49fac01a21878063';
const loading = document.querySelector('#loading_blur');

let verifc_loading = setInterval(() => {
  loading.style.display = 'flex';
}, 10);

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
  newBackground();
  verifica(true);
  cidade.innerText = `| ${dados.name}`;
  InfoDesc.innerText = dados.weather[0].description;
  temp.innerText = `${dados.main.temp}ºC`;
  img.innerHTML = `<img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png" alt="icon tempo" >`;
}

function verifica(dados){
  if (dados) {
    clearInterval(verifc_loading);
    loading.style.display = 'none';
  }

}

// Muda background dependendo da hora 
function newBackground(){
  setInterval( function () {
    let hr = new Date();
    let hora = hr.getHours();
    let minutes = hr.getMinutes(); 
    if(hora >= 18 && minutes >= 00){
      const newFundo = document.querySelector('#fundo');
      newFundo.innerHTML = ' <img class="fundo" src="./img/noite.jpg" alt="">';
    }

    if(hora >= 05 && minutes >= 00 && hora < 12){
      const newFundo = document.querySelector('#fundo');
      newFundo.innerHTML = ' <img class="fundo" src="./img/manha.jpg" alt="">';
    }

    if(hora >= 12 && minutes >= 00 && hora < 18){
      const newFundo = document.querySelector('#fundo');
      newFundo.innerHTML = ' <img class="fundo" src="./img/tarde.jpg" alt="">';
    }

  }, 1000);
}