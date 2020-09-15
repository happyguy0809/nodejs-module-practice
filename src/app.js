//Working on the path
const path = require('path')

//Move to the directory web server
//npm init -y
//npm install express@4.17.1

const express = require('express')
//Express is an application by itself and can do a lot of things and there fore we need to just call express in app
const app = express() 

//We want to use the partial system also of hbs now as we want the website tobe same across all the pages
const hbs = require('hbs')

//Now if we want to point to a public server from where we can use all our html data we need to  point to that location
//we do that using the path function
const publicDir = path.join(__dirname, '../public') //defining where the public directory is located
app.use(express.static(publicDir)) //we can directly access file names if we access them from public dr


//To use the handlebar library for dynamic web pages we need to install
//npm install hbs@4.1.1 //(handlebar)
app.set('view engine', 'hbs')

//Now folders like view , public ,src are defined by default. In case we need to change those we need to have 
//another paths defined for them
const viewsPath = path.join(__dirname, '../views_templates/views')
app.set('views' , viewsPath)

//defining for partials
const partialPath = path.join(__dirname , '../views_templates/partials')
hbs.registerPartials(partialPath)

//app.com for eg we own this so //app.com/help or //app.com/about will all run on the same express server
//so we should use app.get()

//root page
//We dont longer need to define root page in case we are defining the publicDir as the command wont run at all
// app.get('',(request , response) => { //We need do define two arguments 1) request to  get from server and 2) response from the server
//     response.send('<h1>Weather</h1>') //We can send html
// })

//Now in the root page if we want to use the dynamic view (or keep the same view across we need to use
//app.get() instead of app.use()
app.get('',(request,response) => {
    response.render('index.hbs', {
       title : 'Weather app' ,
       name: 'Utkarsh Kumar'
    })   //render means to provide or give a service
})

app.get('/about',(request,response) => {
    response.render('about.hbs', {
       title : 'About me' ,
       name: 'Utkarsh Kumar'
    })   //render means to provide or give a service
})

app.get('/help',(request,response) => {
    response.render('help.hbs', {
       title : 'help needed' ,
       helppara : 'Please contact us in case any help is needed',
       name: 'Utkarsh Kumar'
    })   //render means to provide or give a service
})



// app.get('/help', (request ,response) => {
//     response.send([{
//         name : 'Utkarsh', //We can send JSON too
//         age : 27 
//     },{
//         name : 'Shubhangi',
//         age : 26
//     }])
// })

// app.get('/about', (request,response) => {
//     response.send('<h2>About Page</h2>')
// })

app.get('/products', (request,response) => {
    //console.log(request.query) //we are trying now to integrate the request part also by adding a query using
                               //'?' after url and adding different values after it for eg localhost:3000/products?search=games&rating=5
    if(!request.query.search){ //We can access the query variable like that
        return response.send({
            error : "you must provide a 'search' term for products to work"
        })
    }
    response.send({
        products : '[]'
    })
})

// app.get('/weather', (request,response) => {
//     response.send({
//         Location : 'Bangalore',
//         CurrentTemp : 34,
//         forcast : 'It is raining here in bangalore'
//     })
// })

const geocode = require('./utilities/geocode')
const forecast = require('./utilities/forecast')

//Adding the query in the weather page only
app.get('/weather',(request,response) => {
    if(!request.query.address){
        return response.send({
            error : 'Please add a valid address to view the current weather in the city.'
        })
    }

    //Javascript that is running the query to return the data
    geocode(request.query.address, (error,data) => {
        if(error) return response.send(error)
        forecast(data.latitude,data.longitude, (error,forecastData) => {
            if(error) return response.send(error)
        
        response.send({
            location : request.query.address,
            data : forecastData
        })
    
        })
    })
    // response.send({
    //     location : request.query.address,
    //     forecast : 'It will be sunny today like the rising sun here.'
    // })
})

app.get('/help/*',(request,response) => {
    response.render('error.hbs', {
        title : 'Help article not found',
        name : 'Utkarsh Kumar'
    })
})

//Default need to be at the last so that it can see if none of them matches error 404 page
app.get('*', (request,response) => {
    response.render('error.hbs', {
        title: 'Error 404 NOT FOUND. Please go back to the home page',
        name : 'Utkarsh Kumar'
    })
})
//To start a server use listen()
//A server will always stay on unless we close it using commands or 'cntrl + C'
app.listen(3000, () => { //3000 is just the local port that we have defined as our server where we can see the datalog
    console.log('Server is up on Port 3000')
})

//Now for every change we have made we have to restart the erver but its really time consuming
//so we will simply use nodemon npm so that the server itself takes care of all that
//npm install nodemon@2.0.4
