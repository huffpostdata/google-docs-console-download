Downloads documents from Google Drive, authorizing through an interactive console
session.

# Usage

Install the library like this:

    npm install --save-dev google-drive-console-download

Then use it to download HTML:

    const DocId = '1qLoJYmUEJvpQdP4Xplp6I5JBsMpRY9RZTnak2gPhiEQ'
    const MimeType = 'text/html'
    const gdcd = require('google-drive-console-download')(null)
    gdcd.download(DocId, MimeType, (err, html) => {
      if (err) {
        // Failure: unauthenticated, unauthorized, network failure, missing file
        // The error message will describe what's up
        console.error(err)
      } else {
        // Do something with the HTML. Here, we write it to the console
        console.log(html)
      }
    })

You probably want to use this library interactively on a console, which is why
we suggest `--save-dev` instead of `--save`. If you want to download from
Google Docs on an automated server, we kindly suggest you choose another
library to rely on.

## Configuring Google Auth

That `(null)` at the end is an option. And It's Complicated.

Google uses OAuth 2.0 for authentication. That means it asks what app is
downloading. When you pass `(null)`, you're telling Google you're using an app
called "google-drive-console-download", administered by its project's
maintainers.

That's usually what you want. So usually, add `(null)` after the `require()`
call.

But you may want to tell Google you're using a different project. (The most
likely reason: you don't trust us to maintain this project.) In that case, you
can pass some different JSON to the file. Here's how to get it:

1. Browse to https://console.developers.google.com/apis/dashboard and
   "Create Project". We'll use the example name "my-google-docs-project" here.
2. Browse to the "Credentials" section. Choose "Create Credentials" and then
   "OAuth client ID".
3. "Configure consent screen". You only have to fill in "Product name"; write
   anything (e.g., "my-google-docs-project"). Click "Save".
4. Back at "Create client ID", choose Application type "Other" and enter
   "google-drive-console-download". Click "Save".
5. Close the popup. Find and click the "Download JSON" button on the
   "google-drive-console-download" line.
6. Save the resulting JSON as "config/google-drive-console-download-auth.json".
   *Do* save this authentication data in your project's code repository, and
   *do* publish it if you publish your project's source code. It's
   [not secret](https://developers.google.com/identity/protocols/OAuth2InstalledApp)
   in this use case. It doesn't give anybody access to any files.
7. Enable the API: go to https://console.developers.google.com/apis/dashboard,
   click "Enable API", then "Drive API" and finally "Enable".

Then instead of `(null)`, pass the JSON you downloaded -- e.g.:

    const auth_config = require('./config/google-drive-console-download-auth')
    const gdcd = require('google-drive-console-download')(auth_config)

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
