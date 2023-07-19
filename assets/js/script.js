var audio = document.getElementById('soundpour');
var drinkFormEl = document.getElementById('drink')
var cocktailInput = document.querySelector('#cocktailTxt');
var drinkSearchTerm = document.querySelector('#drink-search-term')
var warningEl = document.getElementById('popup-modal')
//No Text Alert
var modalHandler = function () {
    //popup-modal disappears
    warningEl.classList.add('hidden')
};
//Pour Button
var drinkInputHandler = function (event) {
    event.preventDefault();
    audio.play();
    console.log(cocktailInput.value)
    var cocktail = cocktailInput.value;
//Saves Text
    if (cocktail) {
        // getDrink(cocktail);
        localStorage.setItem('selected-drink', cocktail);
        window.location.href = 'drink-recipe.html';
    } else {
        //popup-modal appears
        warningEl.classList.remove('hidden');
    };
    if (window.location.pathname.includes('drink-recipe.html')) {
    }
};
//PRESSED BUTTONS ACTIONS
drinkFormEl.addEventListener('click', drinkInputHandler);
warningEl.addEventListener('click', modalHandler);