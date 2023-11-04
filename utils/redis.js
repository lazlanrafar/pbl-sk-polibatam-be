const redis = require("redis");

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

const client = redis.createClient({
  host: redisHost,
  port: redisPort,
});

module.exports = {
  client,
  setRedis: async (key, value) => {
    return new Promise((resolve, reject) => {
      client.set(key, value, (err, reply) => {
        if (err) {
          reject(err);
        }

        resolve(reply);
      });
    });
  },
  getRedis: async (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        }

        resolve(reply);
      });
    });
  },
  deleteRedis: async (key) => {
    return new Promise((resolve, reject) => {
      client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        }

        resolve(reply);
      });
    });
  },
};
