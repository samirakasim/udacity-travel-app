const travelData = {}

function addAction (e){
    //Selects the city input field and the value that has been inputted in
    const city = document.getElementById("city-input").value;
    getGeoCity(geonamesbaseURL, city, apiKey)
}

//Geonames api

let geonamesbaseURL = 'http://api.geonames.org/searchJSON?q=';
let apiKey = 'samira200';

const getGeoCity = async (geonamesbaseURL, city, apiKey) => {
    const response = await fetch(geonamesbaseURL+city+ '&maxRows=2' +`&username=${apiKey}`)
    try {
            const data = await response.json();
            console.log(data);
            travelData.lat = data.geonames[0].lat
            travelData.long = data.geonames[0].lng
            travelData.countryName = data.geonames[0].countryName
            travelData.city = city
            console.log("travelData: ", travelData)
            document.getElementById('travel').innerHTML = `You are travelling to ${travelData.city}!`
            
        } catch(error) {
                console.log("error", error);
        }
        getPicture(pixabayBaseURL, pixabayApiKey, travelData)
}

//WeatherBit api
let weatherBitBaseURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
let weatherBitApiKey = 'b93ecaa568884d9e844d0c635ae59541';


const getWeather = async(travelData, weatherBitBaseURL, weatherBitApiKey) => {
    const response = await fetch(weatherBitBaseURL +`&lat=${travelData.lat}&lon=${travelData.long}&key=${weatherBitApiKey}`)
    try {
            const data = await response.json();
            console.log("inside get weather *****", data.data);
      
            for(let i = 0; i<data.data.length; i++){
                let newDate = travelData.travelDate.split("/");
                let newDateFormat = `${newDate[2]}-${newDate[0]}-${newDate[1]}`
            
                if (newDateFormat === data.data[i].valid_date){
                    console.log(data.data[i])
                    let dayOfTravel = data.data[i].valid_date.split("-")
                    console.log('here', dayOfTravel)
                    let newDayOfTravelFormat = `${dayOfTravel[1]}/${dayOfTravel[2]}/${dayOfTravel[0]}`
                    document.getElementById('weather').innerHTML = 'Temperature on ' + (newDayOfTravelFormat) +' is ' + data.data[i].temp + " degrees"
                }
            }
        } catch(error) {
            console.log("error", error);
        }
} 

//Pixabay api
let pixabayBaseURL = 'https://pixabay.com/api/?';
let pixabayApiKey = '30030314-3af8cc06c1682fe8746ff3b23';

const getPicture = async(pixabayBaseURL, pixabayApiKey, travelData) => {
    console.log(travelData)
    const response = await fetch(pixabayBaseURL +`key=${pixabayApiKey}&q=${travelData.countryName}&image_type=photo` )
    try {
        const data = await response.json();
        console.log(data)
        const pic = document.getElementById('pic')
        pic.src = data.hits[1].webformatURL
    } catch(error) {
        console.log('error', error)
    }
}

//getting travel date
const date = new Date();
const countdownDay = document.getElementById('days');
const endDate = document.getElementById('tripLength');

function getTravelDate (e){

    let travelDate = document.getElementById('date').value;
    travelData.travelDate = travelDate;
    let futureDate = new Date(travelDate).getTime();
    let currentDate = new Date().getTime();
    console.log(futureDate)
    console.log(currentDate);
    console.log(travelData)
    // Find the distance between now and the count down date
        let distance = futureDate - currentDate;
        console.log(distance)
    //Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        countdownDay.innerHTML ='Days until Trip: '+ days + ' Days!!!'
// getting end date and working out length of trip
    let endTravelDate = document.getElementById('date-input').value;
    console.log(endTravelDate)
    let formattedEndTravelDate = new Date(endTravelDate).getTime()
    let calc = formattedEndTravelDate - futureDate;
    console.log(calc)
    let daysLeft = Math.floor(calc / (1000 * 60 * 60 * 24));
    endDate.innerHTML = 'Length of trip: '+ daysLeft + ' Days :)'
        getWeather(travelData, weatherBitBaseURL, weatherBitApiKey)
}

export {addAction, getTravelDate, getGeoCity, getWeather, getPicture};
