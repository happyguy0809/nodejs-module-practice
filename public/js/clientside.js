console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error) console.log(data.error)
//         console.log(data)
//     })
// })

//Working with the search bar and configuring the button
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1') //As we have defined the id for 2 paragraphs in the index.hbs as id =message_1 so we access them as '#{idName}'
const messageTwo= document.querySelector('#message-2') 



weatherform.addEventListener('submit', (event) => {   // calling a callback function , submit should be in lowercase only
    event.preventDefault()   //Form had the tendency to refresh the page always when ran so old times useful not useful now

    messageOne.textContent = ' loading ...' //Initializing to empty strings
    messageTwo.textContent = ' '

    //Storing the input of the user
    const userLocation = search.value
    //Now we need to generate the response from the url now if we type in the city
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(userLocation)).then((response) => {
       response.json().then((data) => {
            if(data.error) console.log(data.error)
                console.log(data)
            if(data.error) messageOne.textContent = JSON.stringify(data.error)
                messageOne.textContent = JSON.stringify(data)
        })
    })
})
