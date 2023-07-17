// async function logDrink() {
//     const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita");
//     const drinks = await response.json();

//     console.log(drinks)

// };

// logDrink();

var cocktailEl = document.querySelector("#Cocktail");
var liquorEl = document .querySelector("#Liquor");
var cocktailInput = document.querySelector('#cocktailTxt');
var drinkContainerEl = document.querySelector('#drink-container');

cocktailEl.addEventListener("click", () => {
    location.href = 'cocktail.html';
})

liquorEl.addEventListener("click", () => {
    location.href = 'liquor.html';
})


var formSubmitHandler = function (event) {
    event.preventDefault();
    var cocktail = cocktailInput.value.trim();
    if (cocktail) {
        getUserRepos(cocktail);

        drinkContainerEl.textContent = '';
        cocktailInput.value = '';
    } else {
        alert('Please enter a Cocktail');
    }
};

var getDrink = function (drink) {
    var drinkUrl =  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink ;

    fetch(drinkUrl).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (data) {
                console.log(data);
                displayDrinks(data, drink);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
        })
        .catch(function (error) {
            alert('Unable to connect to CocktailDB');
        });
    };
