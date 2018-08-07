var newButton;
var newGifs = 0;

$(document).ready(function() {
    var startButtons = ["kobe bryant", "james harden", "lebron james", "allen iverson", "michael jordan"]
    
    for (n = 0; n < startButtons.length; n++){
        console.log(startButtons[n]);
        newButton = $("<button class='btn btn-success click' data-thing ='" + startButtons[n] +  "'>").text(startButtons[n]);
        $("#buttonDisplay").append(newButton);
    }
    
    $("#makeButton").on("click", function(){
        var searchSubject = $("#input").val().trim();
        
        newButton = $("<button class='btn btn-success click' data-thing ='" + searchSubject +  "'>").text(searchSubject);
        $("#buttonDisplay").append(newButton);
    })

    $(document).on("click", ".click", function(){
        searchSubject = $(this).attr("data-thing");
        console.log(searchSubject);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BZeZOK4NGX8ngO4qWIpFgv0v4z8ZmZUj&q=" + searchSubject + "&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            var results = response.data;
            console.log(results);
            for ( i = 0; i < results.length; i++) {
                console.log(results[i].images.fixed_height.url);
                console.log(results[i].rating);
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height.url);
                gifDiv.prepend(p);
                gifDiv.prepend(image);

                $("#gifDisplay").prepend(gifDiv);

            }
            
            // console.log(newButton);

        })
    })

    
    
    

});