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

function getEvent(json) {
  const date = json.date.year + "-" + json.date.month + "-" + json.date.day;
  const event = {
    'summary': json.title,
    'start': {
      'date': date,
    },
    'end': {
      'date': date,
    },
    'description' : json.summary,
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'colorId' : 2
  };

  return event;
}


async function clearSavedUser() {
  const content = await fs.readFile(CREDENTIALS_PATH);
}

/**
 * Inserts given event
 */
async function insertEvent(auth, json) {
  const event = getEvent(json);
  const calendar = google.calendar({version: 'v3', auth});
  await calendar.events.insert({
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


/*
Lists next 15 events within the of current event
*/
async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 15,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    return;
  }
  let eventJsons = Array.from({length: events.length});

  events.map((event, i) => {
    const dateArr = event.start.date.split("-").map(str => parseInt(str, 10));
    const title = event.summary;
    const summary = event.description;
    let priority = 3;
    if (title.length >= 3 && title.charAt(title.length-3) == '(' && Number.isInteger(title.charAt(title.length-2)) && title.charAt(title.length-1) == ')') {
      priority = parseInt(title.charAt(title.length-2));
    }

    const json =  {
      title: title,
      summary: summary,
      date: {month: dateArr[1], day: dateArr[2], year: dateArr[0]},
      priority: priority
    };

    eventJsons[i] = [event.id, json];
  });
  return eventJsons;
}

async function updateEvent(auth, eventId, json) {
  const calendar = google.calendar({version: 'v3', auth});

  const event = getEvent(json);

  
  calendar.events.update({
    calendarId: 'primary',
    eventId: eventId,
    resource: event,
  }, (err, res) => {
    if (err) {
      console.error('Error updating event:', err);
      return;
    }
    console.log('Event updated:', res.data);
  });
}

//authorize().then(insertEvent).catch(console.error);
authorize().then(listEvents).catch(console.error);

