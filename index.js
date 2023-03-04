import { catsData } from "./data.js";

const memeModal = document.getElementById('meme-modal');
const modalClose = document.getElementById('modal-close');
const memeBtn = document.getElementById('get-meme-btn');
const catMoods = document.getElementById('cat-moods');
//const checkedRadio = document.querySelector('input[type="radio"]:checked');


//event listeners
modalClose.addEventListener('click', () => {
    memeModal.classList.remove('show-modal')
});

memeBtn.addEventListener('click', () => {
    memeModal.classList.add("show-modal")
    getCheckedValue()
});

function getCheckedValue(){
    if(document.querySelector('input[type="radio"]:checked')){
        let radioValue = document.querySelector('input[type="radio"]:checked').value;
        console.log(radioValue)
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
        <div class="radio">
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

//filtering array and grouping images per mood
//for nongif

function noGifCatsData() {
    let noGifCatsData = catsData.filter(item => {
        return item.isGif == false;
    })

    let modCatData = [];

    emotions.forEach(item => {
        let obj = {}
        let arrOfSingleMood = noGifCatsData.filter(cat => cat.emotionTags.includes(item))
        obj['emotionTags'] = item;
        obj.isGif = [...new Set(arrOfSingleMood.map(sm => sm.isGif))]
        obj.images = [...new Set(arrOfSingleMood.map(sm => sm.image))]
        obj.alt = [...new Set(arrOfSingleMood.map(sm => sm.alt))]

        modCatData.push(obj)
    })
    return modCatData;
}
//console.log(noGifCatsData())


