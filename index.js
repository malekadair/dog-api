



function getHTML(obj){
    console.log(obj)
    let doggoHTML = '';
    obj.message.forEach(dog => {
        doggoHTML += `<a href="${dog}" target="_blank"><img class='dogPic' src="${dog}"></a>`
    });
    return doggoHTML;
}

function displayDoggos(obj){
    const dogHTML = getHTML(obj)
    console.log(dogHTML)
    $('.results').html(`${dogHTML}`)
    $('.hidden').removeClass('hidden')
}



function getDogImages (number) {
    console.log (Number(number))
    if(number !== "" && Number(number) > 0) {
        fetch(`https://dog.ceo/api/breeds/image/random/${number}`)
        .then(response => response.json())
        .then(json => displayDoggos(json))
        .catch("don't be dumb")
    } else {
        alert("You need to type in a number between 1 and 50!")
    }
}


function displayBreed(json){
    console.log('displaybreed:', json)
    $('.results').html(`<a href="${json.message}" target="_blank"><img class='dogPicBreed' src="${json.message}" alt="dog breed of your choice. yet still random somehow."></a>`)
    $('.hidden').removeClass('hidden')
}

function getDogBreed (breed){
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(json => {
            if (json.code != 404){
                displayBreed(json)
            } else {
                $('.results').html('<h3>Sorry, that breed was not found!</h3>')
            }
        })   
}

function watchForm () {
    $('.js-form').submit(e => {
        e.preventDefault();
        const num = $('#numDogs').val()
        getDogImages(num);
      });
    $('.js-form-breed').submit(e => {
        e.preventDefault();
        const breed = $('#dogBreed').val()
        getDogBreed(breed)
    })
}

$(() => {
    watchForm();
})