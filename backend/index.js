import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  organization: "org-RCC6nRoqZBKlke7z8RL13EIn",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;
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

  response.json({
    outputs: results.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
