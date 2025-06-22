const User = require("../models/User.js");
const argon2 = require("argon2");
const Redis = require("ioredis");
const redis = new Redis({
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

const createUser = async (req, res) => {
    const { nickname, password } = req.body;
    const userIP = req.ip;
    
    const existingUser = await User.findOne({ nickname });
    if (existingUser) return res.status(400).json({ message: "Tente um outro nickname" });
    
    try {
        const newAccounts = await redis.incr(userIP);
        
        if (newAccounts === 1) {
            await redis.expire(userIP, 60 * 60 * 8);
        }

        if (newAccounts > 3) {
            return res.status(429).json({ message: "Tente criar uma nova conta mais tarde" });
        }

        const hashedPassword = await argon2.hash(password);

        const user = await new User({
            nickname,
            password: hashedPassword,
        });

        await user.save();

        res.json({ message: "Usuário criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
        console.error("Ocorreu um erro no createUser: " + err.stack);
    }
};

module.exports = createUser;
