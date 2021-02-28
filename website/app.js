/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&units=metric&appid=60d77a449ebbe4229f33381fba7361a7';

// Create a new date instance dynamically with JS
const d = new Date();
const month = d.getMonth() + 1
const newDate = month+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateData);

/* Function called by event listener */
function generateData(e) {
    const enteredZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    fetchWeatherData(baseURL, enteredZip, apiKey)
    .then(function (data){
        // Add data to POST request
        postData('/add', {date: newDate, temp: data.main.temp, userFeelings: feelings } )
        .then(function() {
            updateUI()
        })
    })
}

/* Function to GET Web API Data*/
const fetchWeatherData = async (baseURL, enteredZip, key)=>{
        const response = await fetch(baseURL + enteredZip + key)
        try {
            const data = await response.json();
            return data;
        }
        catch(error) {
            console.log('Error', error);
        }
    }

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch (url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const dataToRender = await request.json();
        document.getElementById('date').innerHTML = dataToRender.date;
        document.getElementById('temp').innerHTML = `${dataToRender.temp} celsius degrees`;
        document.getElementById('content').innerHTML = dataToRender.userFeelings;
    }
    catch (error) {
        console.log('error', error);
    }
}
