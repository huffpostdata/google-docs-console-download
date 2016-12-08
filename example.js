#!/usr/bin/env node
'use strict'

//const gdcd = require('google-drive-console-download')(null)
// If you want to run this test script from here, you'll need to change it to:
//
   const gdcd = require('./index')(null)

// Here, we download some sample HTML.
//
// See google-docs-markup to decide what to do with the HTML:
// https://github.com/huffpostdata/google-docs-markup
gdcd.download('1qLoJYmUEJvpQdP4Xplp6I5JBsMpRY9RZTnak2gPhiEQ', 'text/html', (err, html) => {
  if (err) {
    console.error(err)
  } else {
    console.log(html)
  }
})
