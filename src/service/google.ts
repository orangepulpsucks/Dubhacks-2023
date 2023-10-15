import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

/*const getEvent = (json: any) => {
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

export async function insertEvent(auth: any, json: any) {
    const calendar = google.calendar({ version: 'v3', auth });
    const event = getEvent(json);
    calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    }, function(err: any, event: any) {
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
export async function listEvents(auth: any) {
  console.log("start of listevents")
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
  
  
    let eventJsons = Array.from({length: 5});
  
    events.map((event: any, i: any) => {
      const dateArr = event.start.date.split("-").map((str: any) => parseInt(str, 10));
      const title = event.summary;
      const summary = event.description;
      const priority = 3;
      if (title.length >= 3 && title.charAt(title.length-3) == '(' && Number.isInteger(title.charAt(title.length-2)) && title.charAt(title.length-1) == ')') {
        let priority = parseInt(title.charAt(title.length-2));
      }
  
      let json =  {
        title: title,
        summary: summary,
        date: {month: dateArr[1], day: dateArr[2], year: dateArr[0]},
        priority: priority
      };
  
      eventJsons[i] = [event.id, json];
    });
    return eventJsons;
  }
  
/*export async function updateEvent(auth: any) {
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
    }, (err: any, res: any) => {
      if (err) {
        console.error('Error updating event:', err);
        return;
      }
      console.log('Event updated:', res.data);
    });
  }*/