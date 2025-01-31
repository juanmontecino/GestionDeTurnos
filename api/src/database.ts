import mongoose, { ConnectOptions } from "mongoose";
import config from "./routes/config";

(async () => {
    try {
        const mongooseOptions: ConnectOptions = {
        //    user : config.MONGO_USER,
        //    pass : config.MONGO_PASSWORD
        };
        const db = await mongoose.connect(`${config.URL}`, mongooseOptions);
        console.log("Connected to MongoDB:", db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();
