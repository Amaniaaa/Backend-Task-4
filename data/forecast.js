const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = "https://api.weatherapi.com/v1/current.json?key=15f1e5bf03f74f179b4104338242007&q=" + latitude + ',' + longitude
       request({url,json:true},(error,response)=>{
        // low level error 
        if(error){
            callback('Unable to connect weather service',undefined)
        }
        else if(response.body.error){
           callback(response.body.error.message,undefined)
        }
        else {
           callback(undefined,response.body.location.name + 
            ' It is ' + response.body.current.condition.text + ' and temp is ' + response.body.current.temp_c)
        }
    }) 
}
module.exports = forecast