import Configuration from "openai";
import OpenAIApi from "openai";
import Ajv from "ajv";
import CreateChatCompletion from "openai";
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
              }

// tesseract = require('tesseract.js');
export async function getText(worker, imagePath) {
  const { data: { text } } = await worker.recognize(imagePath);
  return text
}


export async function parseEventInfo(openAI, eventTextInfo, today, ajv) {
  const systemPromptWithDate = SYSTEM_PROMPT + today.toString();
  let retries = 0;
  
  
  while (true) {
    if (retries >= RETRIES_MAX) {
      retries++;
      return null; // Failure
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
    })
    
      let res = chat.data.choices[0].message.content;
      let resJson;

      try {
        resJson = JSON.parse(res);
      } catch {
        retries++;
        continue;
      }

      const validate = ajv.compile(schema);
      const isValid = validate(resJson);

      if (isValid) {
        return resJson
      } else {
        retries++;
        continue;
      }
  }
}



/*
const config = new Configuration({
    apiKey: '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'
  });
const openai = new OpenAIApi(config);

const worker = await createWorker('eng', 1, {
    logger: m => console.log(m), // Add logger here
  });

const eventTextInfo = await getText(worker, "./test.png");

const today = new Date()

const ajv = new Ajv();

const test = parseEventInfo(openai, eventTextInfo, today, ajv);

console.log(test);
*/
