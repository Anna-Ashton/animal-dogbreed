let timer 
let deleteFirstPicDelay
document.getElementById("myBtn").addEventListener("click", displayDate);
document.getElementById("myPal").addEventListener("mouseover", text);
let submitExample=document.getElementById("submitExample");
//function fetches the data
async function power() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        creatingBreedList(data.message)
    } catch (e) {
        console.log("Problem")
    }

}

power()

//code that creates html select dropdown
function creatingBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="dogByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed) {
            return `<option>${breed}</option>`
        }).join('')}
    </select>
     `
}

//code to load animal dog by breed
async function dogByBreed(breed) {
    if (breed != "Choose a dog breed") {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const dat = await res.json() 
    createSlideShow(dat.message)
    }
}

//code or function work is to create the html for empty slideshow div
function createSlideShow(images) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPicDelay)

    if (images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        currentPosition +=2
        if (images.length == 2) currentPosition = 0
        timer = setInterval(nextSLide, 3000)

    } else  {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        `
    }

    function nextSLide() {
        document.getElementById('slideshow').insertAdjacentHTML("beforeEnd", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>
        `)
        deleteFirstPicDelay = setTimeout(function() {
            document.querySelector('.slide').remove()
        }, 1000)
        if (currentPosition + 1>= images.length) {
            currentPosition = 0
        } else {
            currentPosition ++
        }
    }
}



  function displayDate() {
    document.getElementById("demo").innerHTML = Date();
  }

  submitExample.addEventListener("submit", function (e) {
    e.preventDefault();
  })

  function text() {
    document.getElementById("call").innerText = "+254 759-9999";
  }