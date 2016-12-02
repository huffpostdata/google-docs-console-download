'use strict'

const google = require('googleapis')
const readline = require('readline')

function init(authJson) {
  if (authJson === null) authJson = require('./google-docs-console-download-auth')

  if (
      !authJson.hasOwnProperty('installed')
      || !authJson.installed.hasOwnProperty('client_id')
      || !authJson.installed.hasOwnProperty('client_secret')
      || !authJson.installed.hasOwnProperty('redirect_uris')
      || !authJson.installed.redirect_uris[0]
  ) throw new Error('Invalid OAuth 2.0 JSON. Please pass exactly what you download from "https://console.developers.google.com/apis/credentials".')

  const oauth2Client = new google.auth.OAuth2(
    authJson.installed.client_id,
    authJson.installed.client_secret,
    authJson.installed.redirect_uris[0]
  )

  let loggedIn = false

  function withLogin(callback) {
    if (loggedIn) return callback()

    if (process.env.GOOGLE_AUTH_TOKEN) {
      oauth2Client.setCredentials({ access_token: process.env.GOOGLE_AUTH_TOKEN })
      loggedIn = true
      return callback()
    }

    const url = oauth2Client.generateAuthUrl({ scope: 'https://www.googleapis.com/auth/drive.readonly' })
    const rl = readline.createInterface({ input: process.stdin, output: process.stderr })

    process.stderr.write(`Log in to: ${url}\n`)
    rl.question('Enter the code at that URL: ', answer => {
      rl.close()
      oauth2Client.getToken(answer, (err, token) => {
        if (err) return callback(err)

        const access_token = token.access_token
        process.stderr.write(`For the next few hours you can skip this step by prepending this text to the command: GOOGLE_AUTH_TOKEN='${access_token}'\n`)
        oauth2Client.setCredentials({ access_token: access_token })
        return callback()
      })
    })
  }

  function download(docId, callback) {
    withLogin(err => {
      if (err) return callback(err)
      const drive = google.drive({ version: 'v3', auth: oauth2Client })
      drive.files.export({ fileId: docId, mimeType: 'text/html' }, callback)
    })
  }

  return { download: download }
}

module.exports = init
