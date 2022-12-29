const searchBtn = document.getElementById('searchButton');
const searchResults = document.getElementsByClassName('row');
var searchValue;
var title;
var pic;
var type;
var year;
var runtime;
var starring;

searchBtn.addEventListener('click', () => {
  console.log('i am here!')
  searchValue = document.getElementById('searchBox').value;

  //getting the movies related to this search
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2b96601d9amsh39a9aa8a0201408p1ad0abjsn6e00a80510b6',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  };

  fetch('https://online-movie-database.p.rapidapi.com/title/find?q=' + searchValue, options)
    .then(response => response.json())
    //.then(response => console.log(response)) THIS WAS THE DEFAULT THING I COPIED
    .then(response => {
      let returnLength;
      if (response.results.length >= 5) {
        returnLength = 5;
      }
      else {
        returnLength = response.results.length;
      }

      for (let i = 0; i < 5; i++){
        searchResults[i].style.display="none";
        searchResults[i].classList.remove('fade-in');
      }
      

      let pos = 0;
      for (let i = 0; i < returnLength; i++) {
        title = document.getElementById('title-' + i);
        pic = document.getElementById('pic-' + i)
        type = document.getElementById('type-' + i);
        year = document.getElementById('year-' + i);
        runtime = document.getElementById('runtime-' + i);
        starring = document.getElementById('starring-' + i);

        if (response.results[pos].legacyNameText) {
          pos += 1;
        }

        if (!response.results[pos].title) {
          break;
        }

        //---------CHANGE THE TEXT AND IMAGE CONTENT ON THE WEBSITE GIVEN THE INFO FROM THE API---------
        //title
        title.innerHTML = response.results[pos].title;

        //image
        if (response.results[pos].image) {
          pic.src = response.results[pos].image.url;
        }
        else {
          pic.src = "";
        }

        //title type
        type.innerHTML = "Type: " + response.results[pos].titleType; //in case it is a type i haven't covered below
        switch(response.results[pos].titleType){
          case "movie":
            type.innerHTML = "Type: Movie"
            break;
          case "tvMiniSeries":
            type.innerHTML = "Type: TV Mini Series"
            break;
          case "tvSeries":
            type.innerHTML = "Type: TV Series"
            break;
          case "tvMovie":
            type.innerHTML = "Type: TV Movie"
            break;
          case "video":
            type.innerHTML = "Type: Video"
            break;
          case "tvSpecial":
            type.innerHTML = "Type: TV Special"
            break;
        }
        
        //year(s)
        if (response.results[pos].titleType == 'tvSeries') {
          if (response.results[pos].seriesEndYear) {
            year.innerHTML = "Year: " + response.results[pos].seriesStartYear + " - " + response.results[pos].seriesEndYear;
          }
          else {
            year.innerHTML = "Year: " + response.results[pos].seriesStartYear;
          }
        }
        else {
          year.innerHTML = "Year: " + response.results[pos].year;
        }

        //running time
        if (response.results[pos].runningTimeInMinutes) {
          runtime.innerHTML = "Running time: " + response.results[pos].runningTimeInMinutes + " minutes";
        }

        //starring
        if (response.results[pos].principals){
          let starringActors = response.results[pos].principals[0].name;
          for (let j = 1; j < response.results[pos].principals.length; j++){
            starringActors += ", " + response.results[pos].principals[j].name;
          }
          starring.innerHTML = "Starring: " + starringActors;
        }

        //console.log(response.results[pos]); Meant for checking if there are errors
        pos++;
        searchResults[i].style.display = "block";
        searchResults[i].classList.add('fade-in');
      }
      


    })

    .catch(err => console.error(err));
})
