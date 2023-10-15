import Configuration from "openai";
import OpenAIApi from "openai";
import Ajv from "ajv";
import {createWorker} from "tesseract.js";

const RETRIES_MAX = 5;

const SYSTEM_PROMPT = `You are a helpful secretary. Given some text about an event, you will need to 
                      generate a title, a summary of the event, some date information about the text, and a rating of how important the event is (1-5).
                      5 is most important, 1 is least important`

const SCHEMA = {
                name: "getDateInfo",
                description: "Creates a title for the event and grabs basic date information and generates a summary about the event",
                parameters: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description: 'title created from the context given',
                    },
                    summary: {
                      type: "string",
                      description: "a summary of the occuring event"
                    },
                    date: {
                      type: "object",
                      properties: {
                        month: {
                          type: "integer",
                          description: "month of start date",
                          enum: [1,2,3,4,5,6,7,8,9,10,11,12]
                        },
                        day: {
                          type: "integer",
                          description: "day of start date",
                          enum: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
                        },
                        year: {
                          type: "integer",
                          description: "year of start date",
                        }
                      },
                      required: ["month", "day", "year"]
                    },
                    priority: {
                      type: "integer",
                      description: "the priority rating of the event. 5 is very important. 1 is not very important.",
                      enum: [1,2,3,4,5]
                    }
                  },
                  required: ["title", "summary", "date", "priority"]
                }
              };

/*
This class provides utility functions
*/
class GenEventInfo {
  ajv;
  openAI;
  tessWorker;
  today;

  constructor(apiKey) {

    const config = new Configuration({
      apiKey: apiKey
    })
    this.ajv = new Ajv();
    this.openAI = new OpenAIApi(config);
    this.today = new Date();
  }

  // Loads up the worker for tess. CALL BEFORE TRYING OTHER FUNCTIONS
  async init() {
    this.tessWorker = await createWorker('eng', 1, {
      logger: m => console.log(m), // Add logger here
    });
  }

  // Private method to get image text
  async getText(imagePath) {
    const { data: { text } } = await this.tessWorker.recognize(imagePath);
    return text;
  }

  // Private method to get json from GPT
  async parseEventInfo(eventTextInfo) {
    const systemPromptWithDate = SYSTEM_PROMPT + this.today.toString();
    let retries = 0;
    
    
    while (true) {
      if (retries >= RETRIES_MAX) {
        retries++;
        return null; // Failure if gpt retries too often
      }
      
      const chat = await this.openAI.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: [
              {role: "system", content: systemPromptWithDate},
              {role: "user", content: eventTextInfo}
            ],
            functions: [
              SCHEMA
            ],
            function_call: "auto"
        });
      
      let res = chat.choices[0].message;
      let resJson;

      try {
        resJson = JSON.parse(res.function_call.arguments);
      } catch {
        retries++;
        continue;
      }

      const valid = this.ajv.validate(SCHEMA.parameters, resJson);

      if (valid) {
        return resJson;
      } else {
        retries++;
        continue;
      }
    }
  }

  /*
    parseEventFromImage:
    Creates a title for the event and grabs basic date information and generates a summary about the event from
    image containing such information. Returns info in standardized json formatting.

      imagePath - path to image file

      returns - json in the following format
        {
          title: "Jimmy's Birthday",
          date: { month: 10, day: 15, year: 2023 },

          priority: 8
        }

        returns null given an error
  */
  async parseEventFromImage(imagePath) {
    const eventTextInfo = await this.getText(imagePath);
    const resJson = await this.parseEventInfo(eventTextInfo);
    return resJson;
  }


  /*

    getJson:
    Returns date/title/summary/priority info formatted the standardized json

      title - title
      summary - summary
      month - month
      day - day
      year - year
      priority - priority

      returns null if given invalid arguments
  */
  getJson(title, summary, month, day, year, priority) { // Should I just make constructor to initialize the ajv which is used over and over?
    let json =  {
        title: title,
        summary: summary,
        date: {month: month, day: day, year: year},
        priority: priority
      };
  
    const valid = this.ajv.validate(SCHEMA.parameters, json);
  
    if (valid) {
      return json;
    } else {
      return null;
    }
  }
}
/*
let c = new GenEventInfo('key');
await c.init();
let txt = await c.parseEventFromImage("./test.png")
console.log(txt);
*/