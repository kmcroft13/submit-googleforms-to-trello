# Submit Google Form responses to Trello
[Google Apps Script](https://developers.google.com/apps-script/) to submit Google Forms responses to as Trello cards


##Create your Google Form
Create the Google Form you want to accept responses from, including all of the fields. Make sure that there is a Google Sheets file associated with the Form (the new version of Forms doesn't create the Sheet automatically but you can do so manually in the Form's responses tab).


##Apply Script to the responses Sheet
The Script gets applied to the responses Sheet, not the Form itself. Here's how:
1. Open the responses sheet and click "Tools > Script editor..." from the Menu bar
2. Paste all of the code from [GoogleForm-Trello-Integration.js](https://github.com/kmcroft13/submit-googleforms-to-trello/blob/master/GoogleForm-Trello-Integration.js) into the Script Editor
3. Edit the script to input the needed Config Variables at the top, add columns from the responses Sheet, and add any additional form logic as needed. See below for more info about how to collect some of this information including Keys and ObjectIDs from Trello.
4. Create a trigger by clicking the clock icon ![project trigger](https://github.com/kmcroft13/submit-googleforms-to-trello/blob/master/project-trigger.png). Trigger should be setup as below:
| Run              | Events           |                |
| ---------------- |:----------------:| --------------:|
| onFormSubmit     | From spreadsheet | On form submit |
5. That's it! Keep in mind that running tests within the script editor won't work because we need the form submission trigger to activate the script. Confirm things are working correctly by submitting a real for response!


###How do I get Keys, Tokens, and ObjectIDs from Trello?


##A note about security
