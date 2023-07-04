# Submit Google Form responses to Trello #
[Google Apps Script](https://developers.google.com/apps-script/) to submit Google Forms responses to as Trello cards


## Prepare your Google Form ##
Create the Google Form you want to accept responses from, including all of the fields. There must be a Google Sheets file associated with the Form, which does not happen automatically. To do this, go to the Repsonses tab of your Form and click the green Sheets icon to "View responses in Sheets". You will be asked to create a new Sheet to track responses or associate the Form with an existing Sheet; either option will work.

The steps below will be done from inside **the linked Sheet file**, NOT from the Form itself.

## Apply Script to the responses Sheet ##
The Script gets applied to the responses Sheet, not the Form itself. Here's how:

1. Open the Form's linked responses Sheet and click "Extensions > Apps Script" from the Menu bar.

2. Paste all of the code from [GoogleForm-Trello-Integration.js](https://github.com/kmcroft13/submit-googleforms-to-trello/blob/master/GoogleForm-Trello-Integration.js) into the Script Editor. Delete or replace any automatically generated code that's already there.

3. Edit the script to input the needed Config Variables at the top, add columns from the responses Sheet, and add any additional form logic as needed. [See below](https://github.com/kmcroft13/submit-googleforms-to-trello/blob/master/README.md#how-do-i-get-keys-tokens-and-objectids-from-trello) for more info about how to collect some of this information, including Keys and ObjectIDs, from Trello.

4. Create a trigger by clicking the clock icon on the left menu ![project trigger](https://github.com/kmcroft13/submit-googleforms-to-trello/blob/master/project_trigger.png?raw=true) (you may have to give your project a name and save it first). On the Triggers page, click the "Add Trigger" button in the bottom right. Trigger should be setup as below:

| Which Function to Run   | Which deployment  | Event source      | Event type      |
| ----------------------- |------------------ | ----------------- | --------------- |
| onFormSubmit            | Head              | From spreadsheet  | On form submit  |

Choose whatever you want for "Failure notification settings" and click Save.

You may need to go through an authentication flow to authorize Google Apps Scripts to access the Sheets data. You may also get a warning that says "Google hasn't verified this app". **This is expected.** You can safely open the Advanced menu and continue, and then click Allow. You ARE the developer of this code (congrats!) so you know it's safe. If you did it correctly you should see a message that says "Has been successfully authorized to access your data" and then you can close the pop-up.

That's it! Keep in mind that running tests within the Script Editor won't work because we need the form submission trigger to activate the script. Confirm things are working correctly by submitting a real for response!

### How do I get Keys, Tokens, and ObjectIDs from Trello? ###
#### Generating a Key ####
Log in to Trello and visit the [Trello key generator](https://trello.com/app-key) to get a Key specific to your account. Save the Personal Key from this page in the appropriate place (`TrelloKey` variable) in the script you pasted into the Script Editor.

#### Getting a Token ####
Next, you need a token. On the same page as above you will see a Token section with a link to "manually generate a **Token**" (the word "Token" is a link). Click the link and then click the Allow button at the bottom of the page. You should see a message "You have granted access to your Trello account via the token below" and your token will be just below that.

#### Getting ObjectIDs for Lists and Labels ####
Trello doens't always make it easy to get IDs for Objects like Lists, Labels, Boards, Cards, etc. so this is probably the most difficult part of the process. You can make separate API calls to get all of this information, or you can get creative with Developer Tools in Chrome. I prefer to grab the info from Chrome.

In Chrome, go to the Trello board your integration will be adding cards to. Now open Developer Tools in Chrome and go to the Network tab. Create a new card within the list. You will see some new items pop up in the Network monitor. Inspect the JSON object in the responses and here you should be able to find most of the information you need:

+ Find one of the items "cards" and click the "Response" tab
  + Find "idList": The ID there will be the ID you need to paste in the script at the TrelloList variable
+ If you want to add Labels to the cards in the script, add a label to the card you just created
  + In the Network monitor, find the item called idLabels: This is the ID of the label you just added.
+ You can follow the same process with any other attributes you want to add to the cards with the integration!

You can even get info from existing Trello cards for use in this script itself (like to get an existing card's name, or the labels attached to an existing card, etc). See [this post](https://github.com/kmcroft13/submit-googleforms-to-trello/issues/5) for more details, and thanks to [@Erix4](https://github.com/Erix4) for the addition!

#### Getting response info from the Google Sheet ####
Response info can be collected from the Google Sheet by referencing the column number that the data appears in on the sheet. For example, the data in column C on the sheet is in the third column. In the code, column counting is zero indexed so we actually start counting from zero instead of from one. So column C actually references number 2.

If a user's name was in column C, we would capture that data into a JavaScript variable by using the format below:

`var name = row[2];`

Where 2 equals the zero indexed column number. You can then use the name as you would any other Javascript variable in the script.

## A note about security ##
Google Sheets and Forms are by nature collaborative. Be careful when sharing your script with others or allowing others to access your script, as it contains your Trello API token! Anyone who has this token can use it to make API calls on your behalf, allowing them to read and write data to your Trello account.
