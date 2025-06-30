const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Health check route
app.get('/test', (req, res) => {
  res.send('Your bot is online!');
});

// WhatsApp webhook
app.post('/whatsapp', (req, res) => {
  console.log('✅ Message received:', req.body);

  const twiml = new MessagingResponse();
  const msg = req.body.Body?.trim().toLowerCase();

  if (msg === 'start') {
    twiml.message('Welcome! 🎉 Type "quiz" to begin.');
  } else if (msg === 'quiz') {
    twiml.message('🧠 Question 1: What is the chemical symbol for water?\nA. CO2\nB. H2O\nC. O2\n\nReply with A, B, or C.');
  } else if (msg === 'b') {
    twiml.message('✅ Correct! H2O is water.');
  } else if (['a', 'c'].includes(msg)) {
    twiml.message('❌ Wrong! Try again by typing "quiz".');
  } else {
    twiml.message('Hi! Type "start" or "quiz" to begin.');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bot is running on port ${PORT}`);
});
