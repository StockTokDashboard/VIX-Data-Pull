import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const POLYGON_API_KEY = '3oDmY7GWgmWX7MCKppPWcb4M9V3xzTlQ';

app.get('/vix', async (req, res) => {
  try {
    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/INDEX:CBOE_VIX/prev?apiKey=${POLYGON_API_KEY}`);
    const vix = response.data.results[0].c;
    res.json({ vix });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch VIX' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
