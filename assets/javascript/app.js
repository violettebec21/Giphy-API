
console.log("sanity");

$(document).ready(function () {

    // display initial array of animals
    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

    // Function for dumping the JSON content for each button into the div
    function displayanimalInfo() {

        var animals = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=8I87mPazwmPjBxwELpInl2BU9Wp4C1OB";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    // Creating a div for the gif
                        //example of JQuery selector on HTML-- dynamically created HTML element
                    var gifDiv = $("<div>"); 

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var animalImage = $("<img>");

                    // Giving the image tag an src attribute of a property pulled off the result item
                    animalImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and animalImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(animalImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#animals-view").prepend(gifDiv);

                }
            }

        }).catch(function (err) {
            console.log(err);
        });
    }

    // Function for displaying animal data
    function renderButtons() {

        // Deleting the buttons prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

            // Then dynamically generating buttons for each animal in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of animal to our button
            a.addClass("animal");
            // Adding a data-attribute
            a.attr("data-name", animals[i]);
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
    renderButtons();


    // This function handles events where one button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding the animal from the textbox to our array
        animals.push(animal);
        console.log(animals);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
    });

    // Function for displaying the animal info
    // Using $(document).on instead of $(".animal").on to add event listeners to dynamically generated elements
    $(document).on("click", ".animal", displayanimalInfo);

    // ---------------------------------------------------------
    //       // Creating a div for the gif
    //       var gifDiv = $("<div>");

    // // Storing the result item's rating
    // // var rating = results[i].rating;

    // // Creating a paragraph tag with the result item's rating
    // var p = $("<p>").text("Rating: " + rating);

    // // Creating an image tag
    // var animalImage = $("<img>");

    // // Giving the image tag an src attribute of a proprty pulled off the
    // // result item
    // animalImage.attr("src", results[i].images.fixed_height.url);

    // // Appending the paragraph and animalImage we created to the "gifDiv" div we created
    // gifDiv.append(p);
    // gifDiv.append(animalImage);

    // // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
    // $("#gifs-appear-here").prepend(gifDiv);

    // ---------------------------------------------------------


    // Calling the renderButtons function to display the initial buttons
    renderButtons();

});

//notes from tutor session----------------
//below is how we would use .catch to log the specific error message

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     $("#animals-view").text(JSON.stringify(response));
//   }).catch(function(err){
//       console.log(err);
//   });
// }