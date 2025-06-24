// netlify/functions/getNews.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const category = event.queryStringParameters.category || 'general';
  const topic = category.toLowerCase();
  const apiKey = process.env.GNEWS_API_KEY;

  console.log('Requested category:', category);
  console.log('Topic:', topic);
  console.log('API Key exists?', !!apiKey);

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key is missing' }),
    };
  }

  const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&topic=${topic}&token=${apiKey}`;
  console.log('Fetching from URL:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('GNews API Error:', data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed from GNews API', details: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Fetch failed:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news', details: err.message }),
    };
  }
};
