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



let name = test.title;

let start_date = test.startDate;
let start_date_year = start_date.year;
let start_date_month =start_date.month;
let start_date_day = start_date.day;

let start_date_finalize = start_date_year+"-"+start_date_month+"-"+start_date_day;

console.log (start_date_finalize)

let user_gmail = 'steveng.gwy@gmail.com';

let color = test.priority;

let name_finalize = name + ' (' + color + ')';



const event = {
  'summary': name_finalize,
  'start': {
    'date': start_date_finalize,
  },
  'end': {
    'date': start_date_finalize,
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'colorId' : 2,
  'attendees': [
    {'email': user_gmail}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};



/*
const event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2023-10-29T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2023-10-29T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'steveng.gwy@gmail.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};
*/


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


  eventJsons = Array.from({length: 5});

  events.map((event, i) => {
    const dateArr = event.start.date.split("-").map(str => parseInt(str, 10));
    const title = event.summary;
    const summary = event.description;
    const priority = 3;
    if (title.length >= 3 && title.charAt(title.length-3) == '(' && Number.isInteger(title.charAt(title.length-2)) && title.charAt(title.length-1) == ')') {
      priority = parseInt(title.charAt(title.length-2));
    }

    json =  {
      title: title,
      summary: summary,
      date: {month: dateArr[1], day: dateArr[2], year: dateArr[0]},
      priority: priority
    };

    eventJsons[i] = [event.id, json];
  });
  return eventJsons;
}

async function updateevent(auth) {
  const calendar = google.calendar({version: 'v3', auth});

  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 1,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = res.data.items;
  const eventId = 'eventId'; // import eventId here

  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }

  //update function called

  const updatedEvent = {
    summary: 'Good',
    start: {
      date: '2023-12-31', // Update with your desired start date
    },
    end: {
      date: '2023-12-31', // Update with your desired end date
    },
    colorId: 2, // Update with your desired color ID
    attendees: [
      { email: 'steveng.gwy@gmail.com' }, // Update with the email of the attendee
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };
  
  calendar.events.update({
    calendarId: 'primary',
    eventId: eventId,
    resource: updatedEvent,
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

