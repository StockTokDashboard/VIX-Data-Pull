import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/vix', async (req, res) => {
  try {
    const response = await axios.get(
      'https://query1.finance.yahoo.com/v8/finance/chart/^VIX?interval=1d&range=1d'
    );

    const result = response.data.chart.result[0];
    const vixClose = result.indicators.quote[0].close[0];

    res.json({ vix: parseFloat(vixValue.toFixed(1)) });
  } catch (error) {
    console.error('Yahoo VIX fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch VIX from Yahoo' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
