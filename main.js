const BaseURL = `http://api.weatherapi.com/v1/forecast.json`
let locationn = document.querySelector('#location')
let show_card = document.querySelector('#showcard')
let searchLocation = document.querySelector("#findLocation")


async function getdata(country){
    try {
        let weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c26cf76dab074def9e8160413242206&q=${country}&days=3`);
        let final  = await weather.json();
        displayweatherDta(final)
        datweather(final)
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
}

function datweather(data){
    let dataarray = data.forecast.forecastday
    document.querySelector('.todayDate').innerHTML = dataarray[0].date
    locationn.innerHTML = data.location.country
    document.querySelector('.today-weather').innerHTML = `
            <h1 class="cityName fw-bolder fs-3">${data.location.name}</h1>
            <h2 class="fw-bolder display-4 " id="weatherTemp">${data.current.temp_c}°</h2>
            <p id="weatherCondition" class="fw-semibold fs-5">${data.current.condition.text}</p>
            <div class="d-flex align-items-center gap-3">
                <p>
                    <img src="images/wind.png" width="30px" alt="">
                    <span id="windSpeed" class="ms-2 fw-semibold">${data.current.vis_km}km/h</span>
                </p>
                <p>
                    <img src="images/humidity.png" width="30px" alt="">
                    <span id="rainProbability" class="fw-semibold">${data.current.humidity}%</span>
                </p>
            </div>`
}
function displayweatherDta(data) {
    let disdata = data.forecast.forecastday
    let box = ''
    for (let i = 0; i < disdata.length; i++) {
        let date = new Date(disdata[i].date)
        let day = date.toLocaleDateString('en-us',{weekday:'long'})
        box+=`
            <div class="today flex-grow-1 m-2">
                    <div class="innerCard bg-primary-subtle rounded-3 py-2 px-4">
                        <p class="weekDay text-center fw-bolder text-black ">${day}</p>
                        <div class="d-flex justify-content-between">
                            <div class="text-center">
                                <p id="maxTemp" class="temp-type fw-bold m-1">Max Temp</p>
                                <p class="">${disdata[i].day.maxtemp_c}°</p>
                            </div>
                            <div class="text-center">
                                <p id="avgTemp" class="temp-type fw-bold m-1">Avg Temp</p>
                                <p class="">${disdata[i].day.avgtemp_c}°</p>
                            </div>
                            <div class="text-center m-0 p-0">
                                <p id="minTemp" class="temp-type fw-bold m-1">Min Temp</p>
                                <p class="">${disdata[i].day.mintemp_c}°</p>
                            </div>
                        </div>
                        <p class="text-center fw-semibold text-dark-emphasis m-0 p-0">${disdata[i].day.condition.text}</p>
                        <img src="${disdata[i].day.condition.icon}" width="50px" class="m-auto d-block" alt="">
                    </div>
        </div>
        `
        show_card.innerHTML = box
    }
}
//getdata()

searchLocation.addEventListener('change',function(){
    getdata(searchLocation.value)
})
searchLocation.addEventListener('keyup',function(e){
    if(e.key == Enter){
        getdata(searchLocation.value)
    }
})

navigator.geolocation.getCurrentPosition(function(postion){
    let longitude = postion.coords.longitude
    let latitude= postion.coords.latitude
    let mucuronPosition = `${longitude},${latitude}`;
    getdata(mucuronPosition)
})
