const { createClient } = require('redis');

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', err => {
    console.log('Redis Client Error', err);
    process.exit(1);
});

const connectRedis = async () => {
    await client.connect();
    
    await client.set('foo', 'Bar');
    const result = await client.get('foo');
    console.log(result)
}

module.exports = connectRedis;
