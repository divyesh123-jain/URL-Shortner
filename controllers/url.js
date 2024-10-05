const mongoose = require('mongoose');
const URL = require('../models/url');
const shortid = require('shortid');

// Create a cached connection variable
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection, create a new one
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
  });

  cachedDb = db;
  return db;
}

async function handleGenerateShortURL(req, res) {
  try {
    await connectToDatabase();
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    
    const shortID = shortid();
    await URL.create({
      shortID: shortID,
      redirectURL: body.url,
      totalclicks: []
    }).maxTimeMS(5000); // Add a 5 second timeout to the operation
    
    return res.json({ _id: shortID });
  } catch (error) {
    console.error('Error generating short URL:', error);
    res.status(500).json({ error: 'An error occurred while generating short URL' });
  }
}

async function handleGetRedirectURL(req, res) {
  try {
    await connectToDatabase();
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
      { shortID },
      { $push: { totalclicks: { timestamp: Date.now() } } },
      { new: true }
    ).maxTimeMS(5000); // Add a 5 second timeout to the operation

    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({ error: 'An error occurred while redirecting' });
  }
}

async function handleAnalytics(req, res) {
  try {
    await connectToDatabase();
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortID }).maxTimeMS(5000); // Add a 5 second timeout to the operation

    if (!result) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.json({ totalClicks: result.totalclicks.length, analytics: result.totalclicks });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'An error occurred while fetching analytics' });
  }
}

async function handleGetAllShortURLData(req, res) {
  try {
    await connectToDatabase();
    const result = await URL.find({}).maxTimeMS(5000); // Add a 5 second timeout to the operation
    res.json(result);
  } catch (error) {
    console.error('Error fetching all URL data:', error);
    res.status(500).json({ error: 'An error occurred while fetching all URL data' });
  }
}

module.exports = {
  handleGenerateShortURL,
  handleGetRedirectURL,
  handleAnalytics,
  handleGetAllShortURLData
};