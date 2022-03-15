const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});
app.post('/weather', (req, res) => {
  const { cityName } = req.body;
  res.send(cityName);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is on Port ${PORT}`));
