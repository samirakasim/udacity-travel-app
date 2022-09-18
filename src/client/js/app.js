// /* Global Variables */

let geonamesbaseURL = 'http://api.geonames.org/searchJSON?q=';
let apiKey = process.env.GEONAMES_API_KEY;
console.log(apiKey)

//http://api.geonames.org/searchJSON?q=london&maxRows=10&username=samira155

//Adds a click event listener on the generate id- which is the button generate
// document.getElementById('generate').addEventListener('click', addAction);

let travelData = {}

function addAction (e){
    //Selects the city input field and the value that has been inputted in
    const city = document.getElementById("city").value;
    getGeoCity(geonamesbaseURL, city, apiKey)
}



//Get Route 
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


export {addAction}













// let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// const apiKey = '&appid=c0fb025fab9668f8fa653e70abdac9fa&units=metric';

// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();

// //Adds a click event listener on the generate id- which is the button generate
// document.getElementById('generate').addEventListener('click', addAction);

// function addAction (e){
//     //Selects the zip input field and the value that has been inputted in
//     const zip = document.getElementById("zip").value;
//     getWeatherData(baseUrl, zip, apiKey);
// }

// //GET ROUTE
// const getWeatherData = async(baseUrl, zip, apiKey) => {
//     const response = await fetch(baseUrl+zip+apiKey);
//     const feelings = document.getElementById("feelings").value;
//     try {
//         const data = await response.json();
//         console.log(data);
//         // Sending data to the add post request
//         postData('/add', {
//             date: newDate,
//             temperature: data.main.temp,
//             feelings
//         }).then(
//             updateUI()
//         )
//     } catch(error) {
//         console.log("error", error);
//     }
// }

// //POST ROUTE
// const postData = async (url='', data = {})=>{
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers:{
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
//     try {
//         const newData = await response.json();
//             return newData
//     } catch(error){
//         console.log('error', error)
//     }
// }
// //Updates the webpage by taking the data in the all url and using innerHTML to show it on the webpage
// const updateUI = async () => {
//     const response = await fetch('/all');
//     try {
//         const data = await response.json();
//         document.getElementById('date').innerHTML = data.date;
//         document.getElementById('temp').innerHTML = data.temperature + ' degrees';
//         document.getElementById('content').innerHTML = data.feelings;
//     } catch(error) {
//         console.log("error", error);
//     }
// }

// export { addAction }