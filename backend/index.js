//import dependencies
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

//create express app
const app = express();
//set port
const port = 8000;
//use body parser
app.use(bodyParser.json());
//use cors
app.use(cors());

//create configuration
const configuration = new Configuration({
  organization: "org-RCC6nRoqZBKlke7z8RL13EIn",
  apiKey: "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",
});

//create openai api
const openai = new OpenAIApi(configuration);

//create post request to endpoint
app.post("/", async (request, response) => {
  //get chats from request body
  const { chats } = request.body;
  //create chat completion
  const results = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are Hansa's GPT-3 chatbot",
      },
      ...chats,
    ],
  });

  //send response
  response.json({
    outputs: results.data.choices[0].message,
  });
});

//listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
