// async function logDrink() {
//     const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita");
//     const drinks = await response.json();

//     console.log(drinks);

// };

// logDrink();
//const url = 'https://spotify23.p.rapidapi.com/playlist/?id=37i9dQZF1DX4Wsb4d7NKfP';
// const options = {
//     method: 'GET',
//     headers: {
//      'X-RapidAPI-Key': '886b8f4589msh4b5135157d7d5bep1413bajsnc84e14b3155d',
//      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     }
//    };
//    try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(result);
//    } catch (error) {
//     console.error(error);
//    }

var drinkFormEl = document.getElementById('drink')
var cocktailInput = document.querySelector('#cocktailTxt');
var drinkSearchTerm = document.querySelector('#drink-search-term')
console.log(drinkFormEl);

var drinkInputHandler = function (event) {
    event.preventDefault();
    console.log(cocktailInput.value)
    var cocktail = cocktailInput.value;

    if (cocktail) {
        getDrink(cocktail);
        cocktailInput.value = '';
    } else {
        alert('Please enter a Cocktail');
    }
    console.log('pass')
};

var getDrink = function (drink) {
    var drinkUrl =  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink ;
    fetch(drinkUrl).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (data) {
                console.log(data);
                displayDrinks(data);
            });
        }
    });
};

// var displayDrinks = function (recipe, searchTerm) {
//     if (recipe.length === 0) {
//         drinkContainerEl.textContent = 'No Drinks Found';
//         return;
//     }

//     drinkSearchTerm.textContent = searchTerm;

//     for (var index = 0; index < recipe.length; index++) {
//         var drinkName = recipe[index].drinks.strDrink;

//         var drinkEl = document.createElement('a');
//         drinkEl.classList = 'list-item flex-row justify-space-between align-center';
//         drinkEl.setAttribute('href', './drink-recipe.html?drink=' + drinkName);

//         var titleEl = document.createElement('span');
//         titleEl.textContent = drinkName;

//         drinkEl.appendChild(titleEl);

//         var statusEl = document.createElement('span');
//         statusEl.classList = 'flex-row align-center';

//         drinkEl.appendChild(statusEl);

//         drinkContainerEl.appendChild(drinkEl);

//     };
// };

function displayDrinks(recipe) {
    location.href = 'drink-recipe.html'
    var cocktail = recipe.drinks[0];
    var cocktailDiv = document.getElementById("drink-search-term");
    // cocktail name


    cocktailDiv.innerHTML = '';
    var cocktailName = cocktail.strDrink;
    var heading = document.createElement("h1");
    heading.innerHTML = cocktailName;
    // cocktailDiv.appendChild("");
    cocktailDiv.appendChild(heading);
    // cocktail image
    var cocktailImg = document.createElement("img");
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailImg);
    // cocktail ingredients
    var cocktailIngredients = document.createElement("ul");
    cocktailDiv.appendChild(cocktailIngredients);
    var getIngredients = Object.keys(cocktail)
    .filter(function (ingredient) {
        return ingredient.indexOf("strIngredient") == 0;
    })
    .reduce(function (ingredients, ingredient) {
        if (cocktail[ingredient] != null) {
            ingredients[ingredient] = cocktail[ingredient];
        }
        return ingredients;
    }, {});
    for (var key in getIngredients) {
        var value = getIngredients[key];
        listItem = document.createElement("li");
        listItem.innerHTML = value;
        cocktailIngredients.appendChild(listItem);
    }
    
};

drinkFormEl.addEventListener('click', drinkInputHandler);