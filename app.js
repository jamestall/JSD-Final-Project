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
        $("#loader-wrapper").show();
        $("button").html('Thinking...');
        // $.get( "https://anypoint.mulesoft.com/apiplatform/proxy/https://mocksvc.mulesoft.com/mocks/a7f646cf-2da6-4263-8bd4-5e063563c66e/photos?client_id=123&client_secret=123", function( data ) {
        // $.get( "http://172.16.13.139:8081/api/photos", function( data ) {
        $.get( "https://mule-worker-photos-api.cloudhub.io/api/photos?client_id=d4cd80e6f02d4931bd3eca6b20860195&client_secret=69d78707b025480eA38254D20A8E837B", function( data ) {

            var badData = data;
            var betterData = JSON.stringify(badData).replace(/#/g, "%23");
            var correctedData = JSON.parse(betterData);
            //Should use a library, and dangerous to perform it all in one single pass, should iterate through each URL individually - Steven

            $( ".result" ).html( correctedData );

            // create a section for photos in db
            var cardReference = cardAppReference.ref('photos')
            // write response to photos section in db
            cardReference.set(correctedData);
            // $(".showMe").append(data);
            $("body").removeClass('cardsShown');
            $("h1").removeClass('mainTitle');
            $("button").html('Refresh Cards');
            $("#loader-wrapper").hide();
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
                var colorClass = randomElement(color);

                markup =
                    `<div class="cardBorder">
                        <div class="container">
                          <div class="image">
                            <img src="${obj.url}"/>
                          </div>
                          <div class="name">
                            <h1 id="${nameParam(obj.preferredName)}">${obj.preferredName}</h1> 
                          </div>
                          <div class="border ${colorClass}">
                          </div>
                          <div class="question">
                            <h3 class="somethingMoreDescriptive">${randomElement(questions)}</h3>
                          </div>
                          <div class="answer ${colorClass}">
                          </div>
                        </div>
                      </div>`;

                    $("#insertCards").append(markup);
                    colorAssignments[colorClass].push(", " + obj.preferredName + ", " + colorClass);

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
                                <img src="${obj.url}"/>
                              </div>
                              <div class="name" id="${nameParam(obj.preferredName)}">
                                ${obj.preferredName}
                              </div>
                              <div class="question">
                                What are your top three favorite books of all time?
                              </div>
                              <div class="answer ${randomElement(color)}">
                              </div>
                            </div>
                          </div>`;
                    $("#insertCards").append(markup);
                    console.log(i)
                }
                
            }
        })
    }
}

var color = [
    'yellow',
    'lightBlue',
    'green',
    'orange',
    'gray',
    'pink',
    'red',
    'blue',
    'purple',
    'brown'
];

var questions = [
    "If you could live anywhere, where would it be?",
    "What is your proudest accomplishment?",
    "What was the last movie you went to? What did you think?",
    "Who is your favorite author?",
    "What is the best gift you have been given?",
    "What would you do if you won the lottery?",
    "What's the most daring thing you have ever done?",
    "What's your favorite type of foreign food?",
    "What's your favorite family recipe?",
    "What's your favorite family tradition?",
    "What's the most unusual thing you have ever eaten?",
    "Who is the most intelligent person you know?",
    "What is your favorite flavor of ice cream?",
    "What is your strongest talent?",
    "What is your favorite season and why?",
    "What was your favorite toy as a child?",
    "Where is the fartherest you have traveled?",
    "What is your favorite breakfast?",
    "What is the longest car trip you've taken?",
    "What is your favorite drink?",
    "Do you believe in karma?",
    "What is your favorite app?",
    "What is next on your bucket list?",
    "What is your best childhood memory?",
    "What would you most like to learn and why?",
    "What music has most influenced you?",
    "When do you feel the most confident and why?",
    "What do you feel passionate about?",
    "What is one of your most memorable dreams?",
    "What word describes you best?",
    "Where do you want to retire?",
    "Who do you admire?",
    "What is the kindest thing anyone has done for you?"
];

var nameParam = function(name) {
    nameLength = name.length;
    if (nameLength < 12) {
        return "shortName";
    } else if (nameLength >= 12 && nameLength < 15) {
        return "mediumName";
    } else if (nameLength >= 15 && nameLength < 19) {
        return "longName";
    } else {
        return "reallyLongName";
    };
};

var randomElement = function(array) {
  var randomnumber = Math.floor(Math.random()*array.length);
  return array[randomnumber];
};

var colorAssignments = {};

var colorAssignmentArrayCreator = function(array) {
    for(var i = 0; i < array.length; i++) {
      colorAssignments[array[i]] = [];
      colorAssignments[array[i]].name = array[i];
    }
}

colorAssignmentArrayCreator(color);

for (var x in colorAssignments) {
  console.log(colorAssignments[x].name)
}



//*query number of people in response object






