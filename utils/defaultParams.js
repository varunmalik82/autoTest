const appDefaults = {
  baseUrl: 'http://localhost:3000',
  email: process.env.email,
  password: process.env.password || '123456',
  token: process.env.token,
  id: process.env.giftId,
  apiKey: process.env.apiKey || 'testApiKey',
  scriptStatus: process.env.scriptStatus,
  error: process.env.error,
};

module.exports = appDefaults;
