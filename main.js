const apiKey = '128e1a9b';
let moviesName = 'Donnie Darko';
let isSpinnerOff = true;
getMoviesPageData(moviesName);

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
                return "too many results";
            }
            console.log(`Ошибка ${data.Error}`);
            return data.Error;
        }
        spinnerVisionToggler();
        return data;
    } catch (error) {
        console.log(error); // info - текстовый тег под инпутом
    }
}



function spinnerVisionToggler() {
    const turnDisplay = document.getElementById("spinner");
    if (isSpinnerOff === true) {
        turnDisplay.classList.remove("noactive");
        isSpinnerOff = false;
        console.log("spinner on");
    } else {
        turnDisplay.classList.add("noactive");
        isSpinnerOff = true;
        console.log("spinner off");
    }   
}
