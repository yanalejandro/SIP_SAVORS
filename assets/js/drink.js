const clientId = '74cac96df16a41c88732acf98714dbe5';
const clientSecret = '85ad0afcb88f4cd4baecdcc4997483a8';
var backBtnEL = document.getElementById('back-btn')
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
    _getToken();
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

async function _getToken() {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        getSong(data.access_token)
    }

function getSong (spotifyToken) {
    console.log(spotifyToken);
    var songUrl = 'https://api.spotify.com/v1/search?query=remaster%2520track%3A' + selectedDrink + '&type=album,artist,playlist,track&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20';
    console.log(songUrl);
    fetch(songUrl,{ 
        headers: {
        'Content-Type' : 'application/x-www-form-urlencoded', 
        'Authorization' : 'Bearer ' + spotifyToken
    }}).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (data) {
                console.log(data.tracks.items);
                displaySong(data.tracks.items);
            });
        }
    });
};
//get spotify token NOW!!!
_getToken();

function displaySong(items) {
    var songName = items[0].name;
    var songArtists = items[0].artists[0].name;
    console.log(songName);
    var trackDiv = document.getElementById("song-info");
    // track name
    trackDiv.innerHTML = '';
    var heading = document.createElement("h1");
    heading.textContent = '"' + songName + '"' +' by ' + songArtists;
    trackDiv.appendChild(heading);
    // track image
    var trackImg = document.createElement("img");
    trackImg.src = items[0].album.images[0].url;
    trackDiv.appendChild(trackImg);
    // track player
    var trackPlayer = items[0].external_urls.spotify;
    var playerDiv = document.getElementById("song-player");
    playerDiv.src = trackPlayer;
    linkDiv = document.getElementById("song-link");
    linkDiv.href = trackPlayer;
};


backBtnEL.addEventListener('click', ()=>{
    location.href = 'cocktail.html'
})