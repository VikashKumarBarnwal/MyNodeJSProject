const request = require('request')

const forecast = (latitude , longitude  , callback) =>{
    console.log('Forcast Method : latitude = ' + latitude);
      console.log('Forcast Method : longitude = ' + longitude);
    const Weather_Url ='http://api.weatherstack.com/current?access_key=953fdc81b40aafadea8cb55bc914c4bb&query=' + latitude +',' + longitude;
  //  console.log("Weather_Url =" + Weather_Url);
    request({url:Weather_Url,json:true},  (error, response) => {
                  if(error){
                    callback("Unable to connect weather service",undefined);
                  }else if (response.body.error){
                    callback("Unable to find location...",undefined);
                  }else{
                    callback(undefined,  ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.feelslike + '% chance of rain.')
                  }

    });
}

module.exports = forecast
