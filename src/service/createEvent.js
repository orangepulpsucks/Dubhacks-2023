import { test} from './util.mjs'

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}


let name = test.parameters.properties.title.title;
let summary = test.parameters.properties.title.description;

let start_date = test.parameters.properties.start_Date;
let start_date_year = test.parameters.properties.year;
let start_date_month =test.parameters.properties.month;
let start_date_day = test.parameters.properties.day;

let start_date_year_string = start_date_year.toISOString;
let start_date_month_string = start_date_month.toISOString;
let start_date_day_string = start_date_day.toISOString;
let start_date_finalize = '${start_date_year_string}${-}${start_date_month_string}${-}${start_date_day}${T}${start_date_year_string}${-}${start_date_month_string}${-}${start_date_day}';


let user_gmail = 'steveng.gwy@gmail.com';

let color = test.parameters.properties.priority;

const event = {
  'summary': name,
  'description' : summary,
  'start': {
    'date': start_date_finalize,
  },
  'end': {
    'dateTime': start_date_finalize,
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'colorId' : color,
  'attendees': [
    {user_gmail}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};




async function clearSavedUser() {
  const content = await fs.readFile(CREDENTIALS_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function insertEvent(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  const res = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
}


async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
}


authorize().then(insertEvent).catch(console.error);
//authorize().then(listEvents).catch(console.error);
