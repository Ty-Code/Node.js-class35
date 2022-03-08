import fetch from 'node-fetch';
import express from 'express';
import { keys } from './sources/keys.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

let temperature;
app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    res.sendStatus(400);
    return;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${keys.API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const {
      main: { temp },
    } = await response.json();
    res.status(200).send(`${cityName} ${temp}`);
    temperature = temp;
  } catch (error) {
    res.status(500).send({ weatherText: 'City is not found!' });
  }
});

export { app, temperature };
