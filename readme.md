
# SDGen-NG

A next generation Google Shared Drives generation tool, based on Google Forms and Google Apps Script.


## Features

- Google Forms + Google Apps Script based
- No daily limits on page views, executions
- DDoS proof
- Can be configured to require Google Account before requesting


## 📚 Installation

### ⚠️ Warnings
- It is illegal to use hacked/phished accounts! Add only the accounts which you own.
- You **MUST** be able to create shared drive from your Google Workspace Account, else the script won't work.
- I will have zero liability of any Google restrictions imposed on your account or the subscription by using this tool(the account may be suspended by google due to abuse).

### 📙 Generate the domain configuration
🎬 Please refer to the [video tutorial](https://drive.google.com/file/d/1mn6Hq_tON6ek0u36bWtq0IhOEO6Hfw3v).

- First step : read the [⚠️ warnings](https://github.com/MsGsuite/MsGsuite#%EF%B8%8F-warnings)
> ⏣ The steps bellow does not require any gsuite/workspace accounts. They can be done with your own account.


- Go to the [google cloud console](https://console.developers.google.com/apis/credentials) and create a project  
- Then, enable the [google drive api](https://console.developers.google.com/apis/library/drive.googleapis.com?q=drive)
- Go to the [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent) and select "External" and click on "Create"
- Fulfill all required informations (the one with a red *) and click on "Save and Continue" 3 times (the "Scopes" and "Test users" parts do not require any inputs) 
- Click on publish and validate (important)
- On the [Credentials](https://console.cloud.google.com/apis/credentials) tab, click on "Create Credentials" then "OAuth client ID", select "Web application"
- Under "Authorized JavaScript origins" click on "ADD URL" and add `https://developers.google.com` 
- Under "Authorized redirect URIs" click on "ADD URL" and add `https://developers.google.com/oauthplayground`
- Save and note down your Client ID and Secret
> ⏣ From now you need to be logged with your gsuite/workspace account (how can create team drives)
- Go to the [Developers Playground](https://developers.google.com/oauthplayground), click on the ⚙️ in the upper right corner and select "Use your own OAuth credentials" 
- Copy-paste your client ID and client secret from the previous step and press the close button.
- Scroll down the list on the left to "Drive API v3", select it, click on "https://www.googleapis.com/auth/drive" and "authorize API"
- Select your gsuite/workspace account give permissions using your google account, then "Exchange authorization code for tokens", check "Auto-refresh the token before it expires." and note your refresh token.
- Copy the `client_id`, `client_secret` and `refresh_token` for the domain and add it to your `Code.gs` file's `config.domains` array.
- Repeat it for every Google Workspace Account that you have.
- Please note that you can use single pair of `client_id` and `client_secret` and just change the `refresh_token` for every domain. But I'd recommend that you use separate `client_id` and `client_secret` for every domain, to avoid single point of failures in case of your Google Project faces any issues from Google.


## Deployment

To deploy this project on Google Forms

```bash
  npm run deploy
```

###1. Create Google Form
- Login to your account and go to [Google Drive](https://drive.google.com/drive)
- Using option `New` > `Google Forms` > `Blank Form`, create a new Google Form.
![Creating Blank Form](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/create-google-form.jpg?raw=true)
- Provide an appropriate name/title to the Google Form, can be done from top-left corner.
- Configure the Google Form to ask three **required** questions -
  - Google Account Email
  - Shared Drive Name
  - Shared Drive Provider  
- Note: Please don't change the text of the question, as the text of question is used in code to look for the respective response to the question. Also, keep the type of `Shared Drive Provider` quesion as `Dropdown`.
- A completed form should look something like this -
![Completed Google Form](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/sample-google-form.jpg?raw=true)
- Now, go to `Settings` tab of the Google Form(just above the title of the form) and make sure that the highlighted settings shown in below image are configured properly - <br/>
![Google Form Settings](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/google-form-setting.png?raw=true)
- Then, go to `Responses` tab of the Google Form and click on the sheets icon to enable recording the responses in a Google Spreadsheet. This is required to be able to generate Shared Drive upon request -
![Responses to Google Sheet](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/responses-sheet.png?raw=true)
- Upon clicking the Google Sheets icon, you'll be asked about which sheet to use. Go with `Create New Spreadsheet` option and click `Create` -
![Create Spreadsheet](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/create-spreadsheet.png?raw=true)
- Upon clicking `Create` button, the newly created spreadsheet will open. In the Google Spreadsheet, go to `Extensions` menu > click on `Apps Script` option -
![Spreadsheet Apps Script](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/spreadsheet-apps-script.png?raw=true)
- This will open a new tab of Google Apps Script Project with Code Editor. Give the Project a decent name - 
![Apps Script Project Title](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/apps-script-title.png?raw=true)
- Copy and paste your configured `Code.gs` file, ready with all the Shared Drive Providers. Then click on `Save` icon.
- Now, go to Project settings to enable user to modify the manifest file. So as to add more permissions/scopes to the Apps Script Project - 
![Show Appscript Menifest](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/show-appscript-manifest.png?raw=true)
- Go back to `Code Editor` > `appscript.jason` > Add `oauthScopes` to the file as shown in image. This is required to be able to make external api calls from the Apps Script Code -
```
"oauthScopes": [ 
    "https://www.googleapis.com/auth/script.external_request" 
    ]
```
![Add Oauth Scope to Manifest file](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/add-oauthscope-manifest.png?raw=true) 
- Now, go to `Triggers` and click on `Add Trigger` - 
![Add Trigger](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/add-trigger.png?raw=true)
- In the Trigger Configuration, make sure the settings are similar to that shown in the image - 
![Trigger Settings](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/trigger-settings.png?raw=true)
- Upon clicking `Save` to the Trigger, you'll be prompted with the permissions dialog box from Google. These are necessary for the Apps Script code to access the Spreadsheet file in the Google Drive. Click allow to the dialog box.
## Usage/Examples

### Share the Link
- Go to the Google Form, and generate your sharable link - 
![Share Form](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/share-form-link.png?raw=true)
- Note: You may also use your domain name and iFraming technique.


## Debug Errors

- In case the Generator doesn't work as intended, you may see the execution log of every request as shown in the image - 
![Execution Log](https://github.com/alberteinstein42/SDGen-NG/blob/main/documentation/images/execution-log.png?raw=true)
- The code is in Javascript, so a fairly basic knowledge of Javascript would be enough to debug small syntex-typo issues. For serious bugs, please open a fresh [issue](https://github.com/alberteinstein42/SDGen-NG/issues). 
