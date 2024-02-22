const input = document.querySelector("input")
const btn = document.querySelector("form")
const result = document.querySelector(".result")
const audio = document.getElementById("audio")

btn.addEventListener("submit" , function(event){
    event.preventDefault()
    const inputData = input.value
    validateInfo(inputData)
})

function validateInfo(value){
  
  if (!value) {
    return alert("Input must required")
  }
  else{
    input.value = ""
    getWord(value)
  }
}

async function getWord(value){

    try {
      result.innerHTML = "Fetching Data..."
        const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
        const fetchData = await fetch(api)
        const dataToJson = await fetchData.json()
        // console.log(dataToJson);
        addMe(dataToJson)
    } catch (error) {
       result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`
    }
}

function addMe(data) {
    //  console.log(data);

    let myArray = []
    let synArray = []

    const synonyms = data[0].meanings[0].synonyms
    const antonyms =  data[0].meanings[0].antonyms

    synonyms.map(function(element){
      synArray.push(element)
    })

    antonyms.map(function(element){
      myArray.push(element)
    })
    
    // console.log(synArray);
    // console.log(myArray);

 
     if(data[0].meanings[0].definitions[0].example == undefined) {
      
      if (synArray.length === 0 ) {
        
        if(myArray.length === 0){
          result.innerHTML = `
          <h2><strong>Word: </strong><span class="str">${data[0].word}</span></h2> 
           <p class="partSpeech">${data[0].meanings[0].partOfSpeech}</p>
           <h2><strong>Meaning:</strong><span class="anto"> ${data[0].meanings[0].definitions[0].definition}</span></h2>
           <h2><strong>Example:</strong><span class="anto"> Not Found</span></h2>
           <h2><strong>Antonym:</strong><span class="anto"> Not Found</span></h2> 
          <h2><strong>Synonym:</strong><span class="anto"> Not Found</span></h2>
          <div><a href=${data[0].sourceUrls} target="_blank">Read More</a></div>
          `
        }
        else{
          result.innerHTML = `
          <h2><strong>Word: </strong><span class="str">${data[0].word}</span></h2> 
           <p class="partSpeech">${data[0].meanings[0].partOfSpeech}</p>
           <h2><strong>Meaning:</strong><span class="anto"> ${data[0].meanings[0].definitions[0].definition}</span></h2>
           <h2><strong>Example:</strong><span class="anto"> Not Found</span></h2>
           <h2><strong>Antonym:</strong><span class="anto"> ${myArray}</span></h2> 
          <h2><strong>Synonym:</strong><span class="anto"> Not Found</span></h2>
          <div><a href=${data[0].sourceUrls} target="_blank">Read More</a></div>
          `
        }
      }
      else{

        if (myArray.length === 0) {
           result.innerHTML = `
        <h2><strong>Word: </strong><span class="str">${data[0].word}</span></h2> 
        <p class="partSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <h2><strong>Meaning:</strong><span class="anto"> ${data[0].meanings[0].definitions[0].definition}</span></h2>
        <h2><strong>Example:</strong><span class="anto"> Not Found</span></h2>
        <h2><strong>Antonym:</strong><span class="anto"> Not Found</span></h2> 
        <h2><strong>Synonym:</strong><span class="anto"> ${synArray}</span></h2>
       <div><a href=${data[0].sourceUrls} target="_blank">Read More</a></div>

        `
        } else {
          result.innerHTML = `
          <h2><strong>Word: </strong><span class="str">${data[0].word}</span></h2> 
          <p class="partSpeech">${data[0].meanings[0].partOfSpeech}</p>
          <h2><strong>Meaning:</strong><span class="anto"> ${data[0].meanings[0].definitions[0].definition}</span></h2>
          <h2><strong>Example:</strong><span class="anto"> Not Found</span></h2>
          <h2><strong>Antonym:</strong><span class="anto"> ${myArray}</span></h2> 
          <h2><strong>Synonym:</strong><span class="anto"> ${synArray}</span></h2>
         <div><a href=${data[0].sourceUrls} target="_blank">Read More</a></div>
  
          `
        }
       
      }
     }

     else{
    result.innerHTML = 
    ` 
    <h2><strong>Word: </strong> <span class="str">${data[0].word}</span></h2>  
     <p class="partSpeech">${data[0].meanings[0].partOfSpeech}</p>
     <h2><strong>Meaning:</strong><span class="anto"> ${data[0].meanings[0].definitions[0].definition}</span></h2>
     <h2><strong>Example:</strong><span class="anto"> ${data[0].meanings[0].definitions[0].example}</span></h2>
     <h2><strong>Antonym:</strong><span class="anto"> ${myArray}</span></h2>
     <h2><strong>Synonym:</strong><span class="anto"> ${synArray}</span></h2>
     <div><a href=${data[0].sourceUrls} target="_blank">Read More</a></div>
     `
     }
  }

