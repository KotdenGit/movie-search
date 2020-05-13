const apiKey = '128e1a9b';
const moviesName = 'Donnie Darko'; // Mulholland Drive

const warningInfo = document.getElementById("info");
let isSpinnerOff = true;

const sliderCards = document.getElementById("slider")
const textSerch = document.getElementById("searchText");

const form = document.getElementById('searchForm');
form.addEventListener('submit', searchInput);

function searchInput(event){
    warningInfo.innerHTML = "";
    event.preventDefault();
    createSlider(getMoviesPageData(textSerch.value));
}

async function getMoviesPageData(name, pageNumber = 1) {
    try {
        spinnerVisionToggler();
        const url = `https://www.omdbapi.com/?s=${name}&page=${pageNumber}&apikey=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "True") { 
            const promises = data.Search.map(async (movie) =>{
                const result = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
                Object.assign(movie, { imdbRating: (await result.json()).imdbRating });
            });
            await Promise.all(promises);
            
        } else {
            spinnerVisionToggler();
            if (pageNumber > 1) {
                return warningInfo = "Too many results";
            }
            return warningInfo = `Сan't find, ${data.Error}`;
        }
        
        return data.Search;
    } catch (error) {
        warningInfo.innerHTML = `Something went wrong, try changing the query. ${error}`;
    }
}

async function createSlider (movies) {
    try{
        let fragment = document.createDocumentFragment();
        let moviesDisplay = await movies;
        
        for (let movie of moviesDisplay) {
            let movieCard = document.createElement("div");
            movieCard.classList.add("swiper-slide","card");
        
            let nameMovie = document.createElement("div");
            nameMovie.innerHTML = movie.Title;
            movieCard.appendChild(nameMovie);

            let posterMovie = document.createElement("img");
            if (movie.Poster === "N/A") {
                posterMovie.src = 'noPoster.jpg';
            } else {
                posterMovie.src = movie.Poster;
            }
            posterMovie.alt = movie.Title;
            movieCard.appendChild(posterMovie); 

            let movieYear = document.createElement("div");
            movieYear.innerHTML = movie.Year;
            movieCard.appendChild(movieYear);

            let movieRating = document.createElement("div");
            movieRating.innerHTML = movie.imdbRating
            movieCard.appendChild(movieRating);

            fragment.appendChild(movieCard);
        };
        removeCards();
        sliderCards.appendChild(fragment);
        spinnerVisionToggler(); 
    }
    catch (error) {
        warningInfo = `Unable to process incoming data, ${error.message}`;
    }
}


function removeCards() {
    sliderCards.innerHTML = "";
}

function spinnerVisionToggler() {
    const turnDisplay = document.getElementById("spinner");
    if (isSpinnerOff === true) {
        turnDisplay.classList.remove("noactive");
        isSpinnerOff = false;
    } else {
        turnDisplay.classList.add("noactive");
        isSpinnerOff = true;
    }   
}

window.addEventListener("DOMContentLoaded", function () {
    createSlider(getMoviesPageData(moviesName));
});
