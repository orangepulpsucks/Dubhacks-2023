import Configuration from "openai";
import OpenAIApi from "openai";
import Ajv from "ajv";
import {createWorker} from "tesseract.js";

const RETRIES_MAX = 5;

const SYSTEM_PROMPT = `You are a helpful secretary. Given some text about an event, you will need to 
                      generate a title, some date information about the text, and a rating of how important the event is (0-10).
                      Realize that some events don't have end dates and so you shouldn't fill in end date every time.`

const SCHEMA = {
                name: "getDateInfo",
                description: "Creates a title for the event and grabs basic date information",
                parameters: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description: 'title created from the context given',
                    },
                    startDate: {
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
                    endDate: {
                      type: "object",
                      properties: {
                        month: {
                          type: "integer",
                          description: "month of end date",
                          enum: [1,2,3,4,5,6,7,8,9,10,11,12]
                        },
                        day: {
                          type: "integer",
                          description: "day of end date",
                          enum: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
                        },
                        year: {
                          type: "integer",
                          description: "year of end date",
                        }
                      },
                      required: ["month", "day", "year"]
                    },
                    priority: {
                      type: "integer",
                      description: "the priority rating of the event. 10 is very important. 1 is not very important.",
                      enum: [1,2,3,4,5,6,7,8,9,10]
                    }
                  },
                  required: ["title", "startDate", "priority"]
                }
              };


async function getText(worker, imagePath) {
  const { data: { text } } = await worker.recognize(imagePath);
  return text;
}


async function parseEventInfo(openAI, ajv, eventTextInfo, today) {
  const systemPromptWithDate = SYSTEM_PROMPT + today.toString();
  let retries = 0;
  
  
  while (true) {
    if (retries >= RETRIES_MAX) {
      retries++;
      return null; // Failure if gpt retries too often
    }
    
    const chat = await openAI.chat.completions.create({
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

      console.log(SCHEMA.parameters);

      const valid = ajv.validate(SCHEMA.parameters, resJson);

      if (valid) {
        return resJson;
      } else {
        retries++;
        continue;
      }
  }
}

export async function parseEventFromImage(worker, imagePath, openAI, ajv, eventTextInfo, today) {
  const eventTextInfo = await getText(worker, imagePath);
  const resJson = await parseEventInfo(openai, ajv, eventTextInfo, today);
  return resJson;
}


export function getJson(ajv, t, p, sDay, sMonth, sYear, eDay = null, eMonth = null, eYear = null) { // Should I just make constructor to initialize the ajv which is used over and over?
  let json;
  if(eDay == null | eMonth == null | eYear == null) {
    json =  {
      title: t,
      startDate: {month: sMonth, day: sDay, year: sYear},
      priority: p
    };
  } else {
    json = {
      title: t,
      startDate: {month: sMonth, day: sDay, year: sYear},
      endDate: {month: eMonth, day: eDay, year: eYear},
      priority: p
    };
  }

  const valid = ajv.validate(SCHEMA.parameters, json);

  if (valid) {
    return json;
  } else {
    return "";
  }
}

const config = new Configuration({
    apiKey: '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'
  });
const openai = new OpenAIApi(config);

getJson("nruh", )


const test = await 
console.log(test);


/*

{
  title: "Jimmy's Birthday",
  startDate: { month: 10, day: 15, year: 2023 },
  priority: 8
}
*/
