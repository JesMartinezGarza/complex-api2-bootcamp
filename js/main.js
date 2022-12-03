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
      let description = data.data[0].thumbnail.alt_text
      let height = data.data[0].thumbnail.height
      let width = data.data[0].thumbnail.width
      document.querySelector('#api_link').href = api_link
      document.querySelector('#api_link').innerText = api_link

      document.querySelector('#description').innerText = 'Description: ' + description
      document.querySelector('#dimensions').innerText = 'Dimensions: ' + height + ' x ' + width




      fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id,artist_id,style_ids,artist_title,classification_titles`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.data)
        console.log(data.data.image_id)
        console.log('Jesus loves you')


        let title = data.data.title
        let image_id = data.data.image_id
        let artistTitle = data.data.artist_title
        document.querySelector('#title').innerText = 'Title: ' + title

        console.log(artistTitle)

        let classificationTitles = data.data.classification_titles
        let classificationsSpacedCorrectly = ''
        for(let i = 0; i < classificationTitles.length; i++){
          if(i !== classificationTitles.length - 1){
            classificationsSpacedCorrectly += classificationTitles[i] + ', '

          }else
            classificationsSpacedCorrectly += classificationTitles[i]
        }
        document.querySelector('#artistTitle').innerText = 'Artist Title: ' + artistTitle
        document.querySelector('#classificationTitles').innerText = 'Classification Title: ' + classificationsSpacedCorrectly
        document.querySelector('#image_id').innerText = 'Image Id: ' + image_id
        document.querySelector('#painting').src = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`



      })
  
      .catch(err => {
        console.log(`error ${err}`)
      })
    })  

.catch(err => {
  console.log(`error ${err}`)
})

}