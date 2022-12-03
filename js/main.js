//Goal: Use data returned from one api to make a request to another api and display the data returned

document.querySelector('button').addEventListener('click', getPainting)

function getPainting(){

    let keyword = document.querySelector('input').value
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${keyword}&query[term][is_public_domain]=true`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.data[0])
      let id = data.data[0].id
      let api_link = data.data[0].api_link
      
      document.querySelector('#api_link').href = api_link
      document.querySelector('#api_link').innerText = api_link

      if(data.data[0].thumbnail === null){
        console.log('Object has no thumbnail property.')
        document.querySelector('#description').innerText = 'Description: No description provided.'
        document.querySelector('#dimensions').innerText = 'Dimensions: No dimensions provided.'
      }else if(data.data[0].thumbnail.alt_text !== null ){

        let description = data.data[0].thumbnail.alt_text
        let height = ''
        let width = ''
        document.querySelector('#description').innerText = 'Description: ' + description

        if(data.data[0].thumbnail.height === null && data.data[0].thumbnail.width === null){
          document.querySelector('#dimensions').innerText = 'Dimensions: No dimensions provided.'
        }else
          height = data.data[0].thumbnail.height
          width = data.data[0].thumbnail.width
          document.querySelector('#dimensions').innerText = 'Dimensions: ' + height + ' x ' + width
      }else
        document.querySelector('#description').innerText = 'Description: No description provided.'





      fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id,artist_id,style_ids,artist_title,classification_titles`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.data)
        console.log(data.data.image_id)

        let image_id = data.data.image_id
        let title = data.data.title
        let artistTitle = data.data.artist_title


        if(image_id === null){
          image_id = 'No Image Id provided.'
          document.querySelector('#image_id').innerText = 'Image Id: ' + image_id
          document.querySelector('#painting').setAttribute('class', 'hidden')
          console.log(document.querySelector('#painting').getAttribute('src')) 
          console.log('This is here because image_id does equal null in name and type.')
        }else if(image_id !== null){
          document.querySelector('#image_id').innerText = 'Image Id: ' + image_id
          document.querySelector('#painting').src = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`
          console.log('This is here because image_id does not equal null in name and type.')
          document.querySelector('#painting').removeAttribute('class', 'hidden')
        }


        if(title === null){
          title = 'No image title provided.'
        }else if(title !== null){
          document.querySelector('#title').innerText = 'Title: ' + title
        }

        if(artistTitle === null){
          artistTitle = 'No artist title provided.'
        }else if(artistTitle !== null){
          document.querySelector('#artistTitle').innerText = 'Artist Title: ' + artistTitle
        }

        let classificationTitles = data.data.classification_titles
        if(classificationTitles !== null && classificationTitles.length !== 0){
          let classificationsSpacedCorrectly = ''
          for(let i = 0; i < classificationTitles.length; i++){
            if(i !== classificationTitles.length - 1){
              classificationsSpacedCorrectly += classificationTitles[i] + ', '
  
            }else
              classificationsSpacedCorrectly += classificationTitles[i]
          }
          document.querySelector('#classificationTitles').innerText = 'Classification Title: ' + classificationsSpacedCorrectly
        }

      })
  
      .catch(err => {
        console.log(`error ${err}`)
      })
    })  

.catch(err => {
  console.log(`error ${err}`)
})

}