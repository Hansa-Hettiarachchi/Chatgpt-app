import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
    organization:"org-RCC6nRoqZBKlke7z8RL13EIn",
    apiKey: "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"
})

const openai = new OpenAIApi(configuration);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
