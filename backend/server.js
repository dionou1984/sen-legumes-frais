require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await client.messages.create({
      body: `📩 Nouveau message de ${name} (${email}) :\n${message}`,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${process.env.WHATSAPP_TO}`
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erreur Twilio :', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend ready on port ${PORT}`));
