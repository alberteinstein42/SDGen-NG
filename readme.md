
# SDGen-NG

A next generation Google Shared Drives generation tool.


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

To deploy this project on Google Forms ...(detailed process with screenshots)... 


