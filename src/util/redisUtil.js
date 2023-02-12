const redis = require('redis');
const redisClient = redis.createClient(); // redis starts
redisClient.on('error', (error) => console.error(`Error": ${error}`)); // on error

// get the token from redis
const get = async () => {
  redisClient.connect();
  const token = await redisClient.get('token');
  redisClient.disconnect();
  return token;
};

// put the token in redis
const set = async (token) => {
  redisClient.connect();
  await redisClient.set('token', token);
  redisClient.disconnect();
};

module.exports = { get, set };


