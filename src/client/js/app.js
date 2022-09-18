// /* Global Variables */

let geonamesbaseURL = 'http://api.geonames.org/searchJSON?q=';
let apiKey = process.env.GEONAMES_API_KEY;

const travelData = {}

function addAction (e){
    //Selects the city input field and the value that has been inputted in
    const city = document.getElementById("city").value;
    getGeoCity(geonamesbaseURL, city, apiKey)
}


const getGeoCity = async (geonamesbaseURL, city, apiKey) => {
    const response = await fetch(geonamesbaseURL+city+ '&maxRows=1' +`&username=${apiKey}`)
    try {
            const data = await response.json();
            console.log(data);
            travelData.lat = data.geonames[0].lat
            travelData.long = data.geonames[0].lng
            travelData.countryName = data.geonames[0].countryName
            console.log("travelData: ", travelData)
        } catch(error) {
                console.log("error", error);
        }
}

//getting travel date
const date = new Date();
const countdownDay = document.getElementById('days');
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

//WeatherBit api
let weatherBitBaseURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
let weatherBitApiKey = process.env.WEATHERBIT_API_KEY;


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
                    document.getElementById('weather').innerHTML = 'Temperature for Travel Data: ' + data.data[i].temp + " degrees"
                }
            }
        } catch(error) {
            console.log("error", error);
        }
} 

function getTravelDate (e){

    let travelDate = document.getElementById('date').value;
    travelData.travelDate = travelDate;
    let futureDate = new Date(travelDate).getTime();
    // let currentDate = `${day}-${month}-${year}`;
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
        getWeather(travelData, weatherBitBaseURL, weatherBitApiKey)
}

export {addAction, getTravelDate};
