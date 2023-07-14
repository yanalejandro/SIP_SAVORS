async function logDrink() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita");
    const drinks = await response.json();

    console.log(drinks)

};

logDrink();

var cocktailEl = document.getElementById("Cocktail")
var liquorEl = document .getElementById("Liquor")

cocktailEl.addEventListener("click", () => {
    location.href = 'cocktail.html'
})

liquorEl.addEventListener("click", () => {
    location.href = 'liquor.html'
})

var inputCoctail = ""
var drinkUrl =  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="