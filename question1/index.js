const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let window = [];

const fetchNumbers = async (type) => {
  try {
    const response = await axios.get(`http://20.244.56.144/evaluation-service/${type}`, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    return [];
  }
};

app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  const validTypes = ['p', 'f', 'e', 'r'];
  const typeMap = { p: 'primes', f: 'fibo', e: 'even', r: 'rand' };

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const numbers = await fetchNumbers(typeMap[type]);
  const windowPrevState = [...window];

  numbers.forEach((num) => {
    if (!window.includes(num)) {
      if (window.length >= WINDOW_SIZE) {
        window.shift();
      }
      window.push(num);
    }
  });

  const avg = window.reduce((sum, num) => sum + num, 0) / window.length;

  res.json({
    windowPrevState,
    windowCurrState: window,
    numbers,
    avg: parseFloat(avg.toFixed(2)),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
