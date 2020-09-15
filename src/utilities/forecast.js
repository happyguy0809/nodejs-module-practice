
 //Challenge 32
// //Use the HTTP function to access different api's functions
// const url1 = 'http://api.weatherstack.com/current?access_key=3772ef1fe69da7775954021b9b1d53d4&query=37.8234,-122.5432&units=f'
// request ({ url: url1, json: true }, (error,response) => {  //We can actually see different options in npm postman-request page  to see different arguments
//     //console.log(response) //It will actually now only dump the JSON data as we have made json= true in the header
//     //Taken from the  api's that we are accessing need to see that for exact arguments   
//     console.log('It is currently ' + response.body.current.temperature + ' degrees  out there. ') //in faranheit as we have mentioned in the url as units=f in url from api documentation
//     console.log('But it feels like ' + response.body.current.feelslike + ' degrees  out . ')
//     console.log('The chances for raining are ' + response.body.current.precip*100 + ' percent . ')
// })

//Challenge 37
const request = require('postman-request')

const forecast = (latitude,longitude, callback) => {
    const url1 = 'http://api.weatherstack.com/current?access_key=3772ef1fe69da7775954021b9b1d53d4&query=' + latitude + ',' + longitude + '&units=f'
 
    request({url :url1 , json : true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!',undefined)
        } else if(response.body.error) {
            callback('Unable to find Location. Try another search')
        }else {
             callback(undefined,{
                 location : response.body.location.name,
                 country : response.body.location.country,
                 region : response.body.location.region,
                 current_temp: response.body.current.temperature,
                 feelsLike_temp : response.body.current.feelslike,
                 precipitation: response.body.current.precip
             })
        }
    })
 }



 module.exports = forecast