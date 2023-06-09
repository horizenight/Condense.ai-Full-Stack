require("dotenv/config")

const OpenAI = require("openai")
const { Configuration, OpenAIApi } = OpenAI;
const configuration = new Configuration({
  organization: "org-C06aVGmXonhVND21hyqoXRMF",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const express = require('express');
const router = express.Router();

//Multer: File handler
const multer = require("multer")
const upload = multer()

const ytFunction = require("../controllers/yttranscipt");
const pdftotext = require("../controllers/pdftotext");
const audiototext = require("../controllers/audiototext");

router.get('/', async (req, res, next) => {
  const prompt = req.query.valid
  console.log(prompt);

  res.status(200).json({ message: 'Process Completed.' });
});

router.post('/', async (req, res, next) => {
  const prompt = req.query.valid
  console.log(prompt);

  let text=req.body.message;
  console.log(text);

  // const response =  await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: "Summarize in around 200 words.\n\nText:" + text,
  //   temperature: 0.6,
  //   max_tokens: 400,
  //   top_p: 0.5,
  //   best_of: 2,
  //   frequency_penalty: 0.3,
  //   presence_penalty: 0.7,
  // });
  res.status(200).json({ message: 'Process Completed.' });

  // res.status(200).json({ message: 'Process Completed.', "Summary":response.data["choices"][0]["text"]});
});

router.get('/youtubeURL', async (req, res, next) => {
  const prompt = req.query.valid
  console.log(prompt);

  const text = await ytFunction.ytFunction(prompt);
  console.log(text)

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Summarize in around 200 words. in english language\n\nText:" + text,
    temperature: 0.6,
    max_tokens: 400,
    top_p: 0.5,
    best_of: 2,
    frequency_penalty: 0.3,
  });

  res.status(200).json({ "message": 'Process Completed.', "Summary": response.data["choices"][0]["text"] });
});

router.post('/audio', upload.single("audio"), async (req, res, next) => {
  console.log("audio Recieved")
  const text = await audiototext.audiototext(req);
  console.log(text)

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Summarize in around 200 words.\n\nText:" + text,
    temperature: 0.6,
    max_tokens: 400,
    top_p: 0.5,
    best_of: 2,
    frequency_penalty: 0.3,
    presence_penalty: 0.7,
  });

  res.status(200).json({ message: 'Process Completed.', "Summary": response.data["choices"][0]["text"] });
});

router.post('/pdf', upload.single("pdf"), async (req, res, next) => {
  const prompt = req.query.valid
  console.log(prompt);

  let text = await pdftotext.GetTextFromPDF(req)
  console.log(text);


  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Summarize in around 200 words.\n\nText:" + text,
    temperature: 0.6,
    max_tokens: 400,
    top_p: 0.5,
    best_of: 2,
    frequency_penalty: 0.3,
    presence_penalty: 0.7,
  });

  res.status(200).json({ message: 'Process Completed.', "Summary": response.data["choices"][0]["text"] });
});

module.exports = router;