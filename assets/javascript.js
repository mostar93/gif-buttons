var newButton;
var newGifs = 0;
var image;
var results;
// var gifDiv;
var i = 0;

$(document).ready(function() {
    $("#searchSubject").hide();
    var startButtons = ["Kobe Bryant", "James Harden", "Lebron James", "Allen Iverson", "Michael Jordan"]
    
    for (n = 0; n < startButtons.length; n++){
        console.log(startButtons[n]);
        newButton = $("<button class='btn btn-success click' data-thing ='" + startButtons[n] +  "'>").text(startButtons[n]);
        $("#buttonDisplay").append(newButton);
    }
    
    $("#makeButton").on("click", function(){
        var searchSubject = $("#input").val().trim();
        
        newButton = $("<button class='btn btn-success click' data-thing ='" + searchSubject +  "'>").text(searchSubject);
        $("#buttonDisplay").append(newButton);
        $("#input").val('');
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
            results = response.data;
            console.log(results);
            for ( i = 0; i < results.length; i++) {
                // console.log(results[i].images.fixed_width_still.url);
                // console.log(results[i].rating);
                var imageurl = results[i].images.fixed_width_still.url;
                var animate = results[i].images.fixed_width.url;
                var theBigDiv = $("<div class='gifBox'>");
                var gifDiv = $("<img>");
                
                var p1 = $("<p>").text("Title: " + results[i].title);
                var p2 = $("<p>").text("Rating: " + results[i].rating);
                // var p3 = $("<p>").text("Rating: " + results[i].rating);
                // var p4 = $("<p>").text("Rating: " + results[i].rating);
                // console.log(p);
                gifDiv.attr("src", imageurl);
                gifDiv.attr({
                    "data-still": imageurl,
                    "data-animate": animate,
                    "data-state": "still",
                    "class": "gif",
                })
                theBigDiv.prepend(gifDiv);
                theBigDiv.append(p1);
                theBigDiv.append(p2);
                $("#gifDisplay").prepend(theBigDiv);
                // $("#gifDisplay").prepend(results[i].rating);
                $("#searchSubject").text(searchSubject).show();


            }

        })
        
    })

    $(document).on("click", ".gif", function(){
        
        var state = $(this).attr("data-state");
        

        if (state === "still") {
            var url = $(this).attr("data-animate");
            $(this).attr("src", url);
            $(this).attr("data-state", "animate");
            // $(this).attr()
        } else if (state === "animate") {
            var url = $(this).attr("data-still");
            $(this).attr("src", url);
            $(this).attr("data-state", "still");
        }
    })
  
});