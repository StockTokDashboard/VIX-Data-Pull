import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/vix', async (req, res) => {
  try {
    const response = await axios.get(
      'https://query1.finance.yahoo.com/v8/finance/chart/%5EVIX'
    );

    const results = response.data.chart.result;

    if (
      results &&
      Array.isArray(results) &&
      results[0]?.meta?.regularMarketPrice !== undefined
    ) {
      const vixRaw = results[0].meta.regularMarketPrice;
      const vixValue = Math.round(vixRaw * 10) / 10;  // 1 decimal place, safer than toFixed
      res.json({ vix: vixValue });
    } else {
      throw new Error('VIX value not found in response');
    }

  } catch (error) {
    console.error('Yahoo VIX fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch VIX' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
