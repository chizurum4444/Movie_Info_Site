let apiKey = '3105ec90';

window.onload = function(){
    locationClick();
    search();
}

function locationClick(){
    let x = 1;
    $('#dropdown-button').click(function(){ 
        if (x%2 == 0){
         $('#dropdown-menu').attr('class', 'dropdown is-clipped');   
        } else {
            $('#dropdown-menu').attr('class', 'dropdown is-active');
        }
        x++;
        getLocation()
        
    });
}

function deselectDrop(){
    $('#dropdown-menu').attr('class', 'dropdown is-clipped');  
}

function getLocation(){
    var locations = [];
    let content = '';
    var lookup = {};
    fetch('../showtimes.json')
        .then((response) => response.json())
        .then((json) => {   
        for (var item, i = 0; item = json[i++];) {
          var location = item.location;
          if (!(location in lookup)) {
            lookup[location] = 1;
            locations.push(location);
          }
        }      
       for( i = 0; i <locations.length; i++){
            content += `<a href="#" class="dropdown-item">${locations[i]}</a>`;
        }   
        $('#dropdown').html(content);

        dropClick();
    
    })
}

function dropClick(){
    let x = 1;
    var value = '';
    $('.dropdown-item').click(function(){ 
        if (x%2 == 0){
         $(this).attr('class', 'dropdown-item is-clipped');   
        } else {
            $(this).attr('class', 'dropdown-item is-active');
            value = this.innerHTML;
        }
        x++;
        $('#loc').text(value);
        
    });
}


function search() {
    $("#search").click(function() {
        var dt = $('#dateField').val();
        var loc = $('#loc').text();
        
        var year = dt.substr(0,4);
        var month = dt.substring(5,7);
        var day = dt.slice(8);
        
        console.log(loc);
        var dtt = [year,month,day].join('/');
        console.log(dtt);
        $('#pop-up').attr('style','visibility: visible');
        fetch('../showtimes.json')
        .then((response) => response.json())
        .then((json) => { 
             for (i = 0; i < json.length; i++){
                if(json[i].date == dtt && $('#movie-times').children().length < json.length+6){
          
                     $('#movie-times').append(
                        `
                            <tr style='margin-top: 5px;'>
                                <td style='text-align:center; padding:5px' id='name-${i}'> ${json[i].title}</td>
                                <td style='text-align:center; padding:5px' id='times'>
                                    <ul style='padding: 5px' id='${i}-time'></ul>
                                </td>
                           </tr>
                           <tr>
                           <td colspan='2'><hr></td>
                            </tr>
                        `
                    )

                    for( j = 0; j < json[i].times.length; j ++){
                        $(`#${i}-time`).append(
                        `<li>${json[i].times[j]}</li>` 
                        );
                    }

                    $(`#name-${i}`).data('id', json[i].id);

                    // Add the click event listener to the name element
                    $(`#name-${i}`).click(function() {
                        // Retrieve the movie ID from the data attribute
                        var id = $(this).data('id');
                        populateForm(id);
                    });
                    
                }
            }

         });
        
    });
}


function populateForm(id) {
    document.getElementById('ratingList').innerHTML = '';
    document.getElementById('image-container').innerHTML = '';

    fetch('http://www.omdbapi.com/?i=' + id + '&apikey=3105ec90')
    .then((response) => response.json())
    .then(function(movie) {

        $('#image-container').append(`<img class = 'poster' src = ${movie.Poster}'>`);
        $("#titleField").attr("value", movie.Title);
        $("#yearField").attr("value", movie.Year);
        $("#genreField").attr("value", movie.Genre);
        $("#runtimeField").attr("value", movie.Runtime);
        $("#directorField").attr("value", movie.Director);
        $("#writerField").text(movie.Writer);
        $("#actorsField").text(movie.Actors);
        $("#plotField").text(movie.Plot);  
        
        for(var i = 0; i < Math.floor(movie.imdbRating); i++){

            var trophy = document.createElement("img");
            trophy.setAttribute("alt", "Trophy Icon");
            trophy.setAttribute("src", "./images/trophy.png");

            $("#ratingList").append(trophy);
        }
    });

    $('#movieDetails').attr('style','visibility: visible');
}