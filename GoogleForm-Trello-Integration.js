//CONFIG VARIABLES TO EDIT
//Trello app key
//Go to https://trello.com/app-key to generate key
const TrelloKey = "<YOUR_PERSONAL_KEY_HERE>"; //Key to Trello app - SPECIFIC TO YOUR ACCOUNT

//Trello app token
//Go to https://trello.com/1/connect?key=YOUR_PERSONAL_KEY_HERE&name=Google+Form+to+Trello+Feedback+Collection+App&response_type=token&scope=read,write to generate token
const TrelloToken = "<YOUR_TOKEN_HERE>"; //Token for authorization - SPECIFIC TO YOUR ACCOUNT

//ObjectID for Trello List that you want cards to be added to
const TrelloList = "<LIST_ID>";
//END

function createTrelloCard(range) {
  //Get last submitted values from the responses Sheet
  const values = range.getValues();
  const column = values[0];

  //Put values from the Sheet into JS variables
  const timestamp = column[0];
  //ADD MORE VARIABLES HERE FOR EACH COLUMN ON THE SHEET
  //KEEP IN MIND THAT COLUMNS ARE ZERO-INDEXED

  //Build and format data that will be pused for card Name and Description
  //cardName and cardDesc variables should be a String
  //Trello markdown can be put directly into the strings for formatting in the cardDesc

  const cardName = `Test Card Name`;
  let cardDesc = `Card Description\n----------\n\nThis is the card description. Format this using **markdown**, and *add other variables* from the Form response! Like this:\n${column[1]}`;
  //ADD ADDITIONAL LOGIC HERE IF NECESSARY

  //OPTIONAL: Add a footer to the bottom of all submissions
  var footer = `\n\n**Submitted on:** ${timestamp}`;
  cardDesc = cardDesc + footer;

  //OPTIONAL: Add a label to all submissions
  //ObjectIDs for Trello labels in JS variables, added in format ["LABEL_ID_1", "LABEL_ID_2", "LABEL_ID_3"] (etc)
  const labels = [];
  
  //ADD ADDITIONAL LOGIC HERE IF NECESSARY


  //*****************************************************
  //****** DO NOT CHANGE ANYTHING BELOW THIS LINE *******
  //*****************************************************
  //Send POST payload data via Trello API
  //POST [/1/cards], Required permissions: write
  const payload = {
    key: TrelloKey,
    token: TrelloToken,
    idList: TrelloList, //(required) id of the list that the card should be added to
    name: cardName, 
    desc: cardDesc,
    pos: "bottom",
    idLabels: labels,
  };

  //Because payload is a JavaScript object, it will be interpreted as an HTML form
  var url = 'https://api.trello.com/1/cards';
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

function onFormSubmit(e) {
  //Call function to create the card
  createTrelloCard(e.range);
}
