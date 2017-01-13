// Use to modify name and question size to match parent div

// (function($) {
//     $.fn.textfill = function(maxFontSize) {
//         maxFontSize = parseInt(maxFontSize, 10);
//         return this.each(function(){
//             var ourText = $("span", this),
//                 parent = ourText.parent(),
//                 maxHeight = parent.height(),
//                 maxWidth = parent.width(),
//                 fontSize = parseInt(ourText.css("fontSize"), 10),
//                 multiplier = maxWidth/ourText.width(),
//                 newSize = (fontSize*(multiplier-0.1));
//             ourText.css(
//                 "fontSize", 
//                 (maxFontSize > 0 && newSize > maxFontSize) ? 
//                     maxFontSize : 
//                     newSize
//             );
//         });
//     };
// })(jQuery);

//Psuedocode
//Startup, render the intro and button

//listen for button events

//on button click, perform an API call that GETs names and photos
//recieve response, store in Firebase
//query the quantity of people, if more than 40, toggle pagination UI
    //update the pagination page count (40 people per page)
//generate the first page of response cards
    //Insert photo and name
    //Pull in a random question from the array
    //Assign the next color
    //Assemble the card
    //append card to the DOM
    //rinse and repeat
//listen for pagination click events


//Bonus points for:
//clever loading animation



//*Create new Firebase app
//*Initiate Firebase connection

// Listen for event, perform API call on click
$("#generateButton").on('click', function(event) {
    //*configure Get call, figure out how to reference other JS file in mean-time
    $.get() 
});

//*write API response to firebase

//*query number of people in response object






