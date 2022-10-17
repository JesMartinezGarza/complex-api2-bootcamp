//Goal: Use data returned from one api to make a request to another api and display the data returned
//'https://api.api-ninjas.com/v1/country?name=${country}'
//https://api.api-ninjas.com/v1/timezone?city=${capital}


document.querySelector('button').addEventListener('click', getTimeZone)

function getTimeZone(){
    const country = document.querySelector('input').value
    fetch(`https://api.api-ninjas.com/v1/country?name=${country}`,{
        method: 'GET', headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Api-Key': 'LICIk+Uj0UlnuHxZohxiEw==ASwnzAaOvuO51LMH'
        }
    })
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      console.log('hello')
        document.querySelector('h2').innerText = data[0].capital
        let capital = data[0].capital

    fetch(`https://api.api-ninjas.com/v1/timezone?city=${capital}`,{
        method: 'GET', headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Api-Key': 'LICIk+Uj0UlnuHxZohxiEw==ASwnzAaOvuO51LMH'
        }
    })

    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('h3').innerText = data.timezone

    })
    })

    .catch(err => {
        console.log(`error ${err}`)
    });
}