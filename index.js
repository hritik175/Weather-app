const apiKey = "ee1aa891a61e79960f80f1ac566a886b";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherCondition = document.querySelector('.weather img')

async function checkWeather(city){                     // Async is used here to make this function Asynchronous, so i could use await inside it
    const response = await fetch(url + city + `&appid=${apiKey}`);     //Await is used to wait for the response and then proceed forward as 
    
    if(response.status === 404){
        document.querySelector('.error').style.display = 'Block';
        document.querySelector('.weather').style.display = 'none';
    }else{
    var data = await response.json();                           //network request takes time. here it awaits to parse the response as JSON // These async func makes the code readable & synxhronous looking
                                                                //Here .then() & .catch() could be used to handle these promises but it would become nested and less readable.
    console.log(data)
    weatherCondition.src = 'images/' + data.weather[0].main + '.png'
    
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c" ;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    document.querySelector(".weather").style.display = 'Block';
    document.querySelector('.error').style.display = 'none';
    }
}

searchBtn.addEventListener("click",()=>{
    checkWeather(search.value);
    search.value= '';
})
search.addEventListener("keypress",(event)=>{
    if(event.key === 'Enter'){
    checkWeather(search.value);
    search.value= '';
}})


