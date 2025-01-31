import dotenv from 'dotenv';
dotenv.config();

export default{
    MONGO_DATABASE: process.env.MONGO_DATABSE || "maddydb",
    MONGO_USER: process.env.MONGO_USER || "admin",
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
    MONGO_HOST: process.env.MONGO_HOST || "localhost",
    PORT : process.env.PORT || 3000,
    URL : process.env.URL || "http://localhost:3000"
}