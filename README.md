# Submit Google Form responses to Trello #
[Google Apps Script](https://developers.google.com/apps-script/) to submit Google Forms responses to as Trello cards


## Prepare your Google Form ##
Create the Google Form you want to accept responses from, including all of the fields. There must be a Google Sheets file associated with the Form, which does not happen automatically. To do this, go to the Repsonses tab of your Form and click the green Sheets icon to "View responses in Sheets". You will be asked to create a new Sheet to track responses or associate the Form with an existing Sheet; either option will work.

The steps below will be done from inside the linked Sheet file, not from the Form itself.

## Apply Script to the responses Sheet ##
The Script gets applied to the responses Sheet, not the Form itself. Here's how:

1. Open the Form's linked responses Sheet and click "Tools > Script editor..." from the Menu bar.

2. Paste all of the code from [GoogleForm-Trello-Integration.js](https://github.com/kmcroft13/submit-googleforms-to-trello/blob/master/GoogleForm-Trello-Integration.js) into the Script Editor.

3. Edit the script to input the needed Config Variables at the top, add columns from the responses Sheet, and add any additional form logic as needed. [See below](https://github.com/kmcroft13/submit-googleforms-to-trello/blob/master/README.md#how-do-i-get-keys-tokens-and-objectids-from-trello) for more info about how to collect some of this information, including Keys and ObjectIDs, from Trello.

4. Create a trigger by clicking the clock icon ![project trigger](https://github.com/kmcroft13/submit-googleforms-to-trello/blob/master/project-trigger.png) (you may have to give your project a name and save it first). A new tab will open, click the "New Trigger" button in the bottom right. Trigger should be setup as below:

| Which Function | Which deployment | Event source | Event type |
| ----------------------- |------------------ | ----------------- | --------------- |
| onFormSubmit (default) | Head (default) | From spreadsheet | On form submit |

Choose whatever you want for "Failure notification settings" and click Save. You may need to go through an authentication flow to authorize Google Apps Scripts to access the Sheets data. This is expected.

That's it! Keep in mind that running tests within the Script Editor won't work because we need the form submission trigger to activate the script. Confirm things are working correctly by submitting a real for response!

### How do I get Keys, Tokens, and ObjectIDs from Trello? ###
#### Generating a Key ####
Visit the [Trello key generator](https://trello.com/1/appKey/generate) to get a Key specific to your account. Save this key in the appropriate place in the script you pasted into the Script Editor. This Key will be used to generate a Token in the next step.

#### Getting a Token ####
Once you generate a Key, you will need to use that Key to get a Token which will authorize all API calls to Trello. This Token is specific to your Trello account and anyone with the Token will be able to make API calls on your behalf!
Use this URL as the base to generate your Token **(make sure you're logged in to Trello already)**:
https://trello.com/1/connect?key=<YOUR_KEY_HERE>&name=Google+Form+to+Trello+Integration&response_type=token&expiration=never&scope=read,write

Replace **<YOUR_KEY_HERE>** with the Key you generated above and paste this URL in a browser window. Click "Allow" to give the Key access to your data. Copy the Token that was created and save into the appropriate place in your script in the Script Editor.

#### Getting ObjectIDs for Lists and Labels ####
Trello doens't always make it easy to get IDs for Objects like Lists, Labels, Boards, Cards, etc. so this is sometimes the most difficult part of the process. You can make separate API calls to get all of this information, or you can get creative with Developer Tools in Chrome. I prefer to grab the info from Chrome.

In Chrome, go to the Trello board your integration will be adding cards to. Now open Developer Tools in Chrome and go to the Network tab. Create a new card within the list. You will see some new items pop up in the Network monitor. Inspect the JSON object in the responses and here you should be able to find most of the information you need:

+ Find one of the items "cards" and click the "Response" tab
  + Find "idList": The ID there will be the ID you need to paste in the script at the TrelloList variable
+ If you want to add Labels to the cards in the script, add a label to the card you just created
  + In the Network monitor, find the item called idLabels: This is the ID of the label you just added.
+ You can follow the same process with any other attributes you want to add to the cards with the integration!


#### Getting response info from the Google Sheet ####
Response info can be collected from the Google Sheet by referencing the column number that the data appears in on the sheet. For example, the data in column C on the sheet is in the third column. In the code, column counting is zero indexed so we actually start counting from zero instead of from one. So column C actually references number 2.

If a user's name was in column C, we would capture that data into a JavaScript variable by using the format below:

`var name = row[2];`

Where 2 equals the zero indexed column number. You can then use the name as you would any other Javascript variable in the script.

## A note about security ##
Google Sheets and Forms are by nature collaborative. Be careful when sharing your script with others or allowing others to access your script, as it contains your Trello API token! Anyone who has this token can use it to make API calls on your behalf, allowing them to read and write data to your Trello account.
