//get the drink from local storage
selectedDrink = localStorage.getItem('selected-drink');

//drink api call for their drink
function getDrink (drink) {
    var drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink ;
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
//display data on page
if (selectedDrink) {
    console.log('getting-drink');
    console.log(selectedDrink);
    getDrink(selectedDrink);
};
//Update the page
function displayDrinks(recipe) {
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
