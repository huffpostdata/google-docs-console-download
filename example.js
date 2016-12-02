'use strict'

// Usually you'll want to save `google-docs-console-download-auth.json` and
// load the config like this:
//
//   const auth_config = require('./google-docs-console-download-auth')
//
// You can use our sample project. Beware: you don't control it, so it may break
// at any time. See the README entry on how to create your own project.
const auth_config = {"installed":{"client_id":"767548660803-0shhjtfr3hn6hk4ljco53rqvbol35u2i.apps.googleusercontent.com","project_id":"huffpost-data-generator","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"UIxqgJSAsvl07eJnUcuAvd0O","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}

// This is what you'll use in your project:
const gdcd = require('google-docs-console-download')(auth_config)
// If you want to run this test script from here, you'll need to change it to:
//
//   const gdcd = require('./index')(auth_config)

// Here, we download some sample HTML.
//
// See google-docs-markup to decide what to do with the HTML:
// https://github.com/huffpostdata/google-docs-markup
gdcd.download('1qLoJYmUEJvpQdP4Xplp6I5JBsMpRY9RZTnak2gPhiEQ', (err, html) => {
  if (err) {
    console.error(err)
  } else {
    console.log(html)
  }
})
