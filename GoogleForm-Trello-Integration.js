function onFormSubmit(e) {
//Call function to create the card
   createTrelloCard(e.range);


function createTrelloCard(range) {

//CONFIG VARIABLES TO EDIT
  //Trello app key
  //Go to https://trello.com/1/appKey/generate to generate key
  var TrelloKey = "<KEY>"; //Key to Trello app - SPECIFIC TO YOUR ACCOUNT

  //Trello app token
  //Go to https://trello.com/1/connect?key=XXXX&name=Google+Form+to+Trello+Feedback+Collection+App&response_type=token&scope=read,write to generate token
  var TrelloToken = "<TOKEN>"; //Token for authorization - SPECIFIC TO YOUR ACCOUNT

  //ObjectID for Trello List that you want cards to be added to
  var TrelloList = "<LIST_ID>";

  //ObjectIDs for Trello labels in JS variables
  var label1 = '<LABEL_ID>';
  //ADD ADDITIONAL LABELS HERE IF NECESSARY
//END

//Get last submitted values from the responses Sheet
  var values = range.getValues();
  var column = values[0];

//Put values from the Sheet into JS variables
  var timestamp = column[0];
  //ADD MORE VARIABLES HERE FOR EACH COLUMN ON THE SHEET
  //KEEP IN MIND THAT COLUMNS ARE ZERO-INDEXED


//Build and format data that will be pused for card Name and Description
//cardName and cardDesc variables should be a String
//Trello markdown can be put directly into the strings for formatting in the cardDesc

  var cardName = "Test Card Name";
  var cardDesc = "Card Description" + "\n" + "----------" + "\n\n" + "This is the card description. Format this using **markdown**, and add other variables from the Form response!";
  //ADD ADDITIONAL LOGIC HERE IF NECESSARY

  //OPTIONAL: Add a footer to the bottom of all submissions
  var footer = "\n\n" + "**Submitted on: **" + timestamp;
  cardDesc = cardDesc + footer;

//Build labels depending on data from the form. This will be sent in payload (below)
  var labels = label1; //Other Label ObjectIDs from Trello can be added with config variables above
   //ADD ADDITIONAL LOGIC HERE IF NECESSARY


//*****************************************************
//****** DO NOT CHANGE ANYTHING BELOW THIS LINE *******
//*****************************************************
//Send POST payload data via Trello API
//POST [/1/cards], Required permissions: write
    var payload = {"name":cardName,
                  "desc":cardDesc,
                  "pos":"bottom",
                  "due": "", //(required) A date, or null
                  "idList":TrelloList, //(required) id of the list that the card should be added to
                  "idLabels":labels,
                 };

   //Because payload is a JavaScript object, it will be interpreted as an HTML form
   var url = "https://api.trello.com/1/cards?key=" + TrelloKey + "&token=" + TrelloToken + "";
   var options = {"method" : "post",
                  "payload" : payload};

   UrlFetchApp.fetch(url, options);

 }
}
