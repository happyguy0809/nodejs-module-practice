//Challenge 36
const request = require('postman-request')

const geocode = (address, callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVhbXZhcmRhIiwiYSI6ImNrZXlsc2d1OTBja20ydG84NG44eWtqdzAifQ.7SOHqMYz7usqc0ytOxHotw&limit=1'
 
    request({url :url2 , json : true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!',undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find Location. Try another search')
        }else {
             callback(undefined,{
                 latitude : response.body.features[0].center[1],
                 longitude : response.body.features[0].center[0],
                 location: response.body.features[0].place_name
             })
        }
    })
 }



 module.exports = geocode