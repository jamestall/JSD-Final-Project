// Use to modify name and question size to match parent div

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

function writeUserData(name, imageUrl) {
  cardAppReference.ref('people/' + name).set({
    name: name,
    profile_picture : imageUrl
  });
}

$(document).ready(function() {
    // Listen for event, perform API call on click
    $("#generateButton").on('click', function(event) {
        $.get( "https://anypoint.mulesoft.com/apiplatform/proxy/https://mocksvc.mulesoft.com/mocks/a7f646cf-2da6-4263-8bd4-5e063563c66e/photos?client_id=123&client_secret=123", function( data ) {
            $( ".result" ).html( data );

            // create a section for photos in db
            var cardReference = cardAppReference.ref('photos')
            // write response to photos section in db
            cardReference.set(data);
            // $(".showMe").append(data);
            $("body").removeClass('cardsShown');
            $("h1").removeClass('mainTitle');
            $("button").html('Refresh');
        });
    });
    //Get content for cards, add cards to DOM
    photoClass.getPhotos();
});

var photoClass = {
    getPhotos() {
        //retrieve photos 
        cardAppReference.ref('photos').on('value', function (results) {
            returnObject = results.val();
            console.log(returnObject.totalResults);
            

            if (returnObject.totalResults > 40) {
                console.log("more than 40")
            for(var i = 0; i < returnObject.totalResults; i++) {
                
                var obj = returnObject.Resources[i];

                markup =
                    `<div class="cardBorder">
                        <div class="container">
                          <div class="image">
                            <img src="${obj.url}"/>
                          </div>
                          <div class="name">
                            <h1>${obj.preferedName}</h1> 
                          </div>
                          <div class="question">
                            <h3>What are your top three favorite books of all time?</h3>
                          </div>
                          <div class="answer">
                          </div>
                        </div>
                      </div>`;
                document.body.innerHTML = markup;


            };                
            } else {
                console.log("less than 40");
                console.log("printing +" + returnObject.totalResults)
                for(var i = 0; i < returnObject.totalResults; i++) {
 
                    var obj = returnObject.Resources[i];

                    var markup =
                        `<div class="cardBorder">
                            <div class="container">
                              <div class="image">
                                <img class="portrait" src="${obj.url}"/>
                              </div>
                              <div class="name">
                                ${obj.preferedName}
                              </div>
                              <div class="question">
                                What are your top three favorite books of all time?
                              </div>
                              <div class="answer">
                              </div>
                            </div>
                          </div>`;
                    $("#insertCards").append(markup);
                }
                
            }
        })
    }
}

// Create function for portrait vs landscape resizing (max height )

//*query number of people in response object






