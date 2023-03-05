import { catsData } from "./data.js";

//getting DOM elements
const memeModal = document.getElementById('meme-modal');
const modalClose = document.getElementById('modal-close');
const memeBtn = document.getElementById('get-meme-btn');
const catMoods = document.getElementById('cat-moods');
const emotionRadio = document.getElementById('radio');
const imgOrg = document.getElementById('img-org');
const modalInner = document.getElementById('modal-inner');

//event listeners
//clicking the get meme button opens the modal
//clicking the close button and outside the modal closes the modal
document.addEventListener('click', (event) => {
   if(event.target == memeBtn){
   memeModal.classList.add("show-modal")
   modalInner.classList.add("show-modal")
    getCheckedValueAndImage()
   }else if(event.target == modalClose || !event.target.closest('.modal-inner')){
    memeModal.classList.remove('show-modal')
   }
})

document.addEventListener('change', (e) => {
    let radio = document.getElementsByClassName('radio')
    for (let eachRadio of radio){
        eachRadio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
   
});

//display the image that corresponds to a chosen emotion
function getCheckedValueAndImage(){
    let status = document.getElementById("gif-checkbox").checked
    let gifCatsData = getGifCatsDatafull(status);
    let imgDiv = ``

    if(document.querySelector('input[type="radio"]:checked')){
        let radioValue = document.querySelector('input[type="radio"]:checked').value;
        gifCatsData.forEach(data => {
            if(data.emotionTags == radioValue){
                let randValue = Math.floor(Math.random() * data.images.length)
                imgDiv += `<div class="img-holder">
                    <img class="mood-img" src="./images/${data.images[randValue]}" />
                </div>`
            }
        })
        imgOrg.innerHTML = imgDiv        
    }
}

//create array of unique emotions
let emotions = catsData.map(item => {
    return item.emotionTags
}).flat().reduce((acc, prev) => {
    if (acc.indexOf(prev) == -1) {
        acc.push(prev)
    }
    return acc
}, [])

//display radios using the emotions arrays
function displayEmotionsRadio(arr) {
    let radioInputs = ``
    emotions.forEach(element => {
        radioInputs += `
        <div class="radio" id="radio">
            <label for="${element}">${element}</label>
            <input 
                type="radio"
                id="${element}"
                value="${element}"
                name="emotions"
            />
        </div>
        `
    });
    return radioInputs;
}

function render(arr) {
    catMoods.innerHTML = displayEmotionsRadio(arr);
}

render(catsData);

//Reformat catsData Object by filtering with gif status and grouping relating images by emotion
function getGifCatsDatafull(status) {
    //filter by gif state
    let gifCatsData = catsData.filter(item => {
        return item.isGif == status;
    })

    //grouping images by mood
    let modCatData = [];
    emotions.forEach(item => {
        let obj = {}
        let arrOfSingleMood = gifCatsData.filter(cat => cat.emotionTags.includes(item))
        obj['emotionTags'] = item;
        obj.isGif = [...new Set(arrOfSingleMood.map(sm => sm.isGif))]
        obj.images = [...new Set(arrOfSingleMood.map(sm => sm.image))]
        obj.alt = [...new Set(arrOfSingleMood.map(sm => sm.alt))]

        modCatData.push(obj)
    })
    return modCatData;
}


