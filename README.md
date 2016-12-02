Downloads HTML from Google Docs, authorizing through an interactive console
session.

# Usage

Install the library like this:

    npm install --save-dev google-docs-console-download

Then write a wrapper function like this to encapsulate your auth:

    const auth_config = require('./config/google-docs-console-download-auth')
    const gdcd = require('google-docs-console-download')(auth_config)

    function downloadGoogleDocAsHtml(docId, callback) {
      gdcd.download(docId, callback)
    }

You probably want to use this library interactively on a console, which is why
we suggest `--save-dev` instead of `--save`. If you want to download from
Google Docs on an automated server, we kindly suggest you choose another
library to rely on.

## Configuring Google Auth

You must configure this library using Google OAuth credentials. In our example
we read them from `./config/google-docs-console-download-auth.json`. Here's how
to generate that file:

1. Browse to https://console.developers.google.com/apis/dashboard and
   "Create Project". We'll use the example name "my-google-docs-project" here.
2. Browse to the "Credentials" section. Choose "Create Credentials" and then
   "OAuth client ID".
3. "Configure consent screen". You only have to fill in "Product name"; write
   anything (e.g., "my-google-docs-project"). Click "Save".
4. Back at "Create client ID", choose Application type "Other" and enter
   "google-docs-console-download". Click "Save".
5. Close the popup. Find and click the "Download JSON" button on the
   "google-docs-console-download" line.
6. Save the resulting JSON as "config/google-docs-console-download-auth.json".
   *Do* save this authentication data in your project's code repository, and
   *do* publish it if you publish your project's source code. It's
   [not secret](https://developers.google.com/identity/protocols/OAuth2InstalledApp)
   in this use case. It doesn't give anybody access to any files.
7. Enable the API: go to https://console.developers.google.com/apis/dashboard,
   click "Enable API", then "Drive API" and finally "Enable".

Our example.js uses our example app. It may work for you, but we can't guarantee
it will continue to work unless you create your own project.

## Running

During your first call to `gdcd.download()`, this library will prompt you to log
in. Here's an example session:

```
$ node ./example.js
Log in to: https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.readonly&response_type=code&client_id=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob
Enter the code at that URL: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
For the next few hours you can skip this step by prepending this text to the command: GOOGLE_AUTH_TOKEN='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
<html><head><meta content="text/html; charset=UTF-8" http-equiv="....
```

**Do not** save _this_ authentication data in your project's code repository.
It is secret. It gives people access to all your files. Also, beware: if you
pass `GOOGLE_AUTH_TOKEN` to the program, your shell will probably save the
token in its history file.
