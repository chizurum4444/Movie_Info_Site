let apiKey = '3105ec90';

window.onload = function(){
    let id = localStorage.getItem('movieId');
    fillData(id);
    rating(id);
}

function fillData(){
    fetch('http://www.omdbapi.com/?i=' + id + '&apikey=3105ec90')
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        $('#image-container').append(`<img class = 'poster' src = ${json.Poster}'>`);
                
        $('#titleField').attr('value', `${json.Title}`);
        $('#yearField').attr('value', `${json.Year}`);
        $('#genreField').attr('value', `${json.Genre}`);
        $('#runtimeField').attr('value', `${json.Runtime}`);
        $('#directorField').attr('value', `${json.Director}`);
        $('#writerField').attr('value', `${json.Writer}`);
        $('#actorsField').attr('value', `${json.Actors}`);
        $('#plotField').attr('value', `${json.Plot}`);
    });
}

function rating(){
        fetch('http://www.omdbapi.com/?i=' + id + '&apikey=3105ec90')
        .then((response) => response.json())
        .then((json) => {
            let x = json.Ratings[0].Value;
            let y = Math.floor(eval(x)*10);
            for (var i =0; i < y; i++){
                $('#ratingList').append(
                    `<li style = 'display:inline'>
                                  <img src = 'images/trophy.png'>
                              </li>`
                );
            }
        })
              
}

