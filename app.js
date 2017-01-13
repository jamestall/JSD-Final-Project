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



  // Initialize Firebase
var config = {
apiKey: "AIzaSyCAY5i_sqhDDW4Kuqv5YqFzeQJ4ucoFQK4",
authDomain: "workerphotos.firebaseapp.com",
databaseURL: "https://workerphotos.firebaseio.com",
storageBucket: "workerphotos.appspot.com",
messagingSenderId: "906126585423"
};
firebase.initializeApp(config);

// connect your Firebase application using your reference URL
var cardAppReference = firebase.database();

$(document).ready(function() {
    // Listen for event, perform API call on click
    $("#generateButton").on('click', function(event) {
        $.get( "https://anypoint.mulesoft.com/apiplatform/proxy/https://mocksvc.mulesoft.com/mocks/a7f646cf-2da6-4263-8bd4-5e063563c66e/photos?client_id=123&client_secret=123", function( data ) {
            $( ".result" ).html( data );
            alert( "Load was performed." );
            console.log(data);
    //*write API response to firebase
            // create a section for photos in db
            var cardReference = cardAppReference.ref('photos')
        });
    });
});




//*query number of people in response object






