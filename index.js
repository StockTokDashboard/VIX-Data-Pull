import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/vix', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.polygon.io/v2/aggs/ticker/INDEX:CBOE_VIX/prev',
      {
        params: {
          apiKey: process.env.POLYGON_API_KEY
        }
      }
    );

    const vixValue = response.data.results[0].c; // closing price
    res.json({ vix: vixValue });
  } catch (error) {
    console.error('VIX fetch error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch VIX' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
